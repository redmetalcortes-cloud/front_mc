import { apiFetch } from "./fetchWrapper";

export async function uploadFigure(file) {
  const form = new FormData();
  form.append("file", file);
  return apiFetch("/figures/upload", { method: "POST", body: form, isForm: true });
}

export async function listMyFigures() {
  return apiFetch("/figures/my");
}

export async function quoteFigure({ figureId, materialId, thicknessId, quantity }) {
  return apiFetch("/figures/quote", {
    method: "POST",
    body: { figureId, materialId, thicknessId, quantity },
  });
}
