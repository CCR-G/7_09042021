import store from "../store";

export function clearSession(): void {
  store.dispatch("clearUser");
  sessionStorage.clear();
}
