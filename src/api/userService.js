import { apiFetch } from "./fetchWrapper";

export async function registerUser(payload) {
  // { email, password, name, address, phone }
  return apiFetch("/auth/register", { method: "POST", body: payload });
}

export async function getMe() {
  return apiFetch("/users/me");
}

export async function getAllUsers() {
  return apiFetch("/users");
}

export async function getUserById(id) {
  return apiFetch(`/users/${id}`);
}
