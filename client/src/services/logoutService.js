import { fetchPost } from "../util/fetchUtil.js";
import { session } from "../stores/sessionStore.js";
import { navigate } from "svelte-routing";

export async function logout() {
    await fetchPost("/auth/logout", {});
    session.set(null);
    navigate("/login");
}