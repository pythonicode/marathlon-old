import { error, json } from '@sveltejs/kit';
import { PUBLIC_STRAVA_CLIENT_ID } from "$env/static/public";
import { STRAVA_CLIENT_SECRET, SUPABASE_JWT_SECRET } from "$env/static/private";
import type { RequestHandler } from './$types';
import { admin } from '$lib/util/supabase_admin';
import { sign } from 'jsonwebtoken';
 
export const GET = (async ({ request }) => {
    const access_token = request.headers.get("Authorization")?.split(" ")[1];
    if(!access_token) throw error(400, "Invalid access token");
    const after = Math.floor(Date.now() / 1000) - 31536000;
    let activities: any[] = [];
    let page = 1;
    while(true) {
        const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${after}&page=${page}&per_page=200$`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        const result = await response.json();
        if(result.message == "Rate Limit Exceeded") throw error(429, "Rate Limit Exceeded");
        activities = activities.concat(result);
        page++;
        if(result.length == 0) break;
    }
    throw error(500, "Not implemented")
}) satisfies RequestHandler;
