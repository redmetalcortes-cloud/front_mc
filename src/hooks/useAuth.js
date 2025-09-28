import { useAuthContext } from "../store/authContext";
export default function useAuth() {
  return useAuthContext();
}
