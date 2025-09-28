import { API_URL } from "../config";
import useAuth from "./useAuth";

/** Hook que devuelve una función fetch con el token ya incluido. */
export default function useFetch() {
  const { token } = useAuth();

  return async (path, { method = "GET", headers = {}, body, isForm = false } = {}) => {
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
    if (!res.ok) throw new Error(typeof data === "string" ? data : (data?.message || "Error en la solicitud"));
    return data;
  };
}
