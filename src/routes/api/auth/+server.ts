import { redirect, error, json } from '@sveltejs/kit';
import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
import { STRAVA_CLIENT_SECRET } from "$env/static/private";
import { SUPABASE_JWT_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';
import { sign } from "jsonwebtoken";
 
export const GET = ( async ({ url }) => {
    const state = url.searchParams.get("state");
    if(state === "strava") {
        const error = url.searchParams.get("error");
        const scope = url.searchParams.get("scope");
        if (error == "access_denied") throw redirect(307, `/connect?error=${error}`);
        else if(scope != "read,activity:write,activity:read_all,profile:read_all") throw redirect(307, `/connect?error=invalid_scope`);
        const code = url.searchParams.get("code");
        const response = await fetch(`https://www.strava.com/oauth/token?client_id=${PUBLIC_STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`, {
            method: "POST",
        });
        if(!response.ok) throw redirect(307, `/connect?error=${response.status}`);
        const result = await response.json();
        const { access_token, refresh_token, expires_at, athlete } = result;
        const token = sign({ access_token, refresh_token, expires_at }, SUPABASE_JWT_SECRET);
        throw redirect(301, `/start?token=${token}`);
    } else throw error(400, "Invalid state");
}) satisfies RequestHandler;
