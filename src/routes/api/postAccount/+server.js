
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function POST({ request, cookies }) {

	const data = await request.json();
	console.log(data)
	//extract data from request and cookies:
	const session = JSON.parse(cookies.get("session"));

	// console.log("session:", session);
	console.log(session.user.id)


	//schicke eine Fetch-Anfrage an Supabase
	const response = await fetch(PUBLIC_SUPABASE_URL + "/rest/v1/accounts", {
		method: "POST",
		headers: {
			apikey: PUBLIC_SUPABASE_ANON_KEY,
			Authorization: "Bearer " + session.access_token,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
			{
				user_id: session.user.id,
				designation: data.accountName,
				balance: data.startingBalance,

			})

	})

	return response;
}