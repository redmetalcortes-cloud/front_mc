import { apiFetch } from "./fetchWrapper";

export async function listMaterials() {
  return apiFetch("/materials");
}

export async function createMaterial({ name, price }) {
  return apiFetch("/materials", { method: "POST", body: { name, price } });
}

export async function updateMaterial(id, { name, price }) {
  return apiFetch(`/materials/${id}`, { method: "PUT", body: { name, price } });
}

export async function addThickness(materialId, { name, price }) {
  return apiFetch(`/materials/${materialId}/thickness`, { method: "POST", body: { name, price } });
}

export async function updateThickness(materialId, thicknessId, { name, price }) {
  return apiFetch(`/materials/${materialId}/thickness/${thicknessId}`, { method: "PUT", body: { name, price } });
}

export async function deleteThickness(materialId, thicknessId) {
  return apiFetch(`/materials/${materialId}/thickness/${thicknessId}`, { method: "DELETE" });
}
