import { supabase } from "$lib/supabase"
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/custom')) {
        return new Response('custom response');
    }
    let user = null;
    const cookie = event.cookies.get('jwt');
    console.log("cookie", cookie)
    if (cookie !== "null" && cookie !== undefined) {
        const jwt = JSON.parse(event.cookies.get('jwt')).access_token;
        user = await supabase.auth.getUser(jwt);
    }
    console.log(event.route)
    if (!user && event.route.id !== "/login") {
        throw redirect(302, '/login');
    }
    const response = await resolve(event);
    return response;
}