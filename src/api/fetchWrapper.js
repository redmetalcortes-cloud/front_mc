import { API_URL } from "../config";

/** Alternativa a useFetch */

function getStoredToken() {
  try {
    const raw = localStorage.getItem("mc_auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

export async function apiFetch(path, { method = "GET", headers = {}, body, isForm = false } = {}) {
  const token = getStoredToken();
  const finalHeaders = { ...headers };
  let finalBody = body;

  if (!isForm && body && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }
  if (token) finalHeaders["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { method, headers: finalHeaders, body: finalBody });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = typeof data === "string" ? data : (data?.message || "Error en la solicitud");
    throw new Error(msg);
  }
  return data;
}
