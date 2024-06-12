
import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function POST({ request, cookies }) {

	//extract data from request and cookies:
	const session = JSON.parse(cookies.get("session"));

	// console.log("session:", session);
	console.log(session.user.id)

	//schicke eine Fetch-Anfrage an Supabase
	fetch(PUBLIC_SUPABASE_URL + "/rest/v1/accounts", {
		method: "POST",
		headers: {
			
		}
	})

	return new Response("ois supa")
}