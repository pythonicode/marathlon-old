import { error, redirect } from "@sveltejs/kit";
import { createAuthorizedClient, type JWT } from "$lib/util/supabase";
import { decode } from "jsonwebtoken";

import type { LayoutServerLoad } from "./$types";


export const load = (async ({ cookies, fetch }) => {
    let session = cookies.get("session");
    if(!session) throw redirect(301, "/connect");
    const jwt: any = decode(session);
    if(!jwt) throw error(500, "Invalid session");
    if(Date.now() / 1000 + 1000 > jwt.exp) {
        const result = await fetch(`/api/auth/strava/refresh?id=${jwt.id}&refresh_token=${jwt.refresh}`);
        if(!result.ok) throw error(500, "Failed to refresh session");
        const data: { session: string } = await result.json();
        session = data.session;
    }
    const client = createAuthorizedClient(session);
    const { data: user, error: user_err } = await client.from('athletes').select().single();
    const { data: tokens, error: tokens_err } = await client.from('tokens').select().single();
    if(user_err !== null) throw error(500, user_err.message);
    else if(tokens_err !== null) throw error(500, tokens_err.message);
    const activities = await fetch(`/api/strava/stats`, {
        headers: {
            "Authorization": `Bearer ${tokens.access_token}`
        }
    });
    return { user, tokens };
}) satisfies LayoutServerLoad;