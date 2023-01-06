import { error, json } from '@sveltejs/kit';
import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
import { STRAVA_CLIENT_SECRET, SUPABASE_JWT_SECRET } from "$env/static/private";
import type { RequestHandler } from './$types';
import { admin } from '$lib/util/supabase_admin';
import { sign } from 'jsonwebtoken';
 
export const GET = (async ({ url, cookies }) => {
    const id = url.searchParams.get("id");
    const refresh = url.searchParams.get("refresh_token");
    if(!refresh) throw error(400, "Invalid refresh token");
    const response = await fetch(`https://www.strava.com/oauth/token?client_id=${PUBLIC_STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${refresh}&grant_type=refresh_token`, {
        method: "POST",
    });
    const result = await response.json();
    const { access_token, refresh_token, expires_at } = result;
    const { error: tokens_insert_error } = await admin.from('tokens').upsert({ id, access_token, refresh_token, expires_at });
    const token = sign({ id, role: "authenticated", iat: Math.floor(Date.now() / 1000), exp: expires_at, refresh: refresh_token }, SUPABASE_JWT_SECRET);
    cookies.set("session", token, { path: "/" });
    return json({ session: token });
}) satisfies RequestHandler;
