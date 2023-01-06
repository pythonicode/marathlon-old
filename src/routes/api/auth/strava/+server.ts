import { error, json } from '@sveltejs/kit';
import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
import { STRAVA_CLIENT_SECRET } from "$env/static/private";
import { SUPABASE_JWT_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';
import { sign } from "jsonwebtoken";
import { admin } from '$lib/util/supabase_admin';
 
export const GET = ( async ({ cookies, url }) => {
    const scope = url.searchParams.get("scope");
    if(scope && scope.split(",").length < 4) throw error(400, "Invalid scope");
    const code = url.searchParams.get("code");
    const response = await fetch(`https://www.strava.com/oauth/token?client_id=${PUBLIC_STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`, {
        method: "POST",
    });
    if(!response.ok) throw error(400, "Session Expired");
    const result = await response.json();
    const { access_token, refresh_token, expires_at, athlete } = result;
    const id = athlete.id;
    const { error: athletes_insert_error } = await admin.from('athletes').upsert({ id, avatar: athlete.profile, first_name: athlete.firstname, last_name: athlete.lastname });
    const { error: tokens_insert_error } = await admin.from('tokens').upsert({ id, access_token, refresh_token, expires_at });
    if(athletes_insert_error || tokens_insert_error) throw error(500, "Internal Server Error");
    const token = sign({ id, role: "authenticated", iat: Math.floor(Date.now() / 1000), exp: expires_at, refresh: refresh_token }, SUPABASE_JWT_SECRET);
    cookies.set("session", token, { path: "/" });
    return json({ session: token });
}) satisfies RequestHandler;
