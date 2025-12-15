import { fetchPost } from "../util/fetchUtil.js";
import { session } from "../stores/sessionStore.js";
import { navigate } from "svelte-routing";
import socket from '../util/socket.js';

export async function logout() {
    await fetchPost("/auth/logout", {});
    socket.disconnect();
    session.set(null);
    navigate("/login");
}