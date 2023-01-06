import { authorization_token } from "$lib/util/supabase";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ url, fetch }) => {
    const code = url.searchParams.get("code");
    const scope = url.searchParams.get("scope");
    if(code) {
        const response = await fetch(`/api/auth/strava?code=${code}&scope=${scope}`);
        if(!response.ok) throw redirect(301, "/connect?error=session_expired");
        const { session } = await response.json();
        authorization_token.set(session);
        throw redirect(301, "/start");
    }
    return {};
}) satisfies PageLoad;