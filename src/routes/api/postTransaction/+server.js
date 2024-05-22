import { accounts, transactions } from '$lib/store';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	const dummy = await request.json();
	const myAccounts = await supabase.from('accounts').select('*');
	console.log(myAccounts);
	console.log(dummy.sender_id);
	if (dummy.amount <= 0) {
		return new Response('Amount should be greater than 0', { status: 400 });
	}
	return new Response("Transaction done", { status: 200 });
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
	console.log("sender is wrong")
}
