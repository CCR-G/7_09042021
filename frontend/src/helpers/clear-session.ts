import store from "../store";
import router from "../router";

export function clearSession(): void {
    sessionStorage.clear();
    store.dispatch('clearUser');
    if ((router.history.current.path !== "/login") && (router.history.current.path !== "/register")) {
        router.replace("/login");
    };
}
