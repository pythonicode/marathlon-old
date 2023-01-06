import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY  } from "$env/static/public";

import { createClient } from "@supabase/auth-helpers-sveltekit";
import { readable, writable } from "svelte/store";
import type { SupabaseClient } from "@supabase/supabase-js";

export type JWT = {
    id: number;
    role: string;
    iat: number;
    exp: number;
    refresh: string;
}

export const createAuthorizedClient = (token: string | null) => {
    if(token) {
        return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
    }
    return createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}


export const authorization_token = writable<string | null>(null);
const auth_client_store = readable<SupabaseClient>(createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY), (set) => {
    authorization_token.subscribe((token) => {
        if(token) {
            set(createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }));
        }
    });
});


export let client: SupabaseClient;
auth_client_store.subscribe((value) => {
    client = value;
});