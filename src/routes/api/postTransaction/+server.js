
import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function POST({ request, cookies }) {

	//extract data from request and cookies:
	const data = await request.json();
	const session = JSON.parse(cookies.get("session"));
	const accountList = JSON.parse(cookies.get("account_list"));

	console.log("session:", session);
	console.log("accountList:", accountList);

	//TODO: check if the sender_id corresponds to an account of the logged in user:



	//check if amount is positive:
	if (data.amount <= 0) {
		return new Response('Amount should be greater than 0', { status: 400 });
	}


	//TODO: perform insert operation and return response to the frontend:
	const response = await fetch(PUBLIC_SUPABASE_URL + "/rest/v1/transactions", {
		method: "POST",
		headers: {},
		body: {}
	});

	return new Response("Transaction done", { status: 200 });

	//LEGACY CODE:
	// if ($accounts.map(account => account.id).includes(dummy.sender_id)) {
	// 	console.log("sender is right")
	// 	if (dummy.amount <= 0) {
	// 		return new Response('Amount should be greater than 0', { status: 400 });
	// 	} else if (dummy.sender_id === accounts[0].id) {
	// 		if (accounts[0].balance < dummy.amount) {
	// 			return new Response('balance to low', { status: 400 });
	// 		}
	// 	}

	// 	const { data, error } = await supabase.from('transactions').insert([
	// 		{
	// 			sender_id: dummy.sender_id,
	// 			receiver_id: dummy.receiver_id,
	// 			amount: dummy.amount,
	// 			purpose: dummy.purpose
	// 		}
	// 	]);

	// 	if (error)
	// 		return new Response(
	// 			"oh no... seems we have database issues... relax, it's not your fault! plz contact our admin...",
	// 			{ status: 500 }
	// 		);
	// 	return new Response(JSON.stringify(data));
	// }

}
