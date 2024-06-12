import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function POST({ request, cookies }) {
	// Extrahiere die Daten aus dem Request und den Cookies
	const data = await request.json();
	const session = JSON.parse(cookies.get('session'));
	const accountList = JSON.parse(cookies.get('account_list'));
	const account = JSON.parse(cookies.get('account'));

	//Finde den Account in der accountList, der der Benutzer-ID der Session entspricht:
	const account = accountList.find((account) => account.user_id === session.user.id);

	//Überprüfe, ob der sender_id dem Konto des eingeloggten Benutzers entspricht:
	if (data.sender_id !== account.id) {
		return new Response('Invalid sender_id', { status: 400 });
	}

	//Überprüfe, ob der Betrag positiv ist:
	if (data.amount <= 0) {
		return new Response('Amount should be greater than 0', { status: 400 });
	}

	//Überprüfe, ob der Kontostand des Senders ausreicht:
	if (account.balance < data.amount) {
		return new Response('Balance too low', { status: 400 });
	}

	//Führe die Einfügeoperation durch und gib die Antwort an das Frontend zurück:
	const response = await fetch(PUBLIC_SUPABASE_URL + '/rest/v1/transactions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			apikey: PUBLIC_SUPABASE_ANON_KEY,
			Authorization: 'Bearer ' + session.access_token
		},
		body:
			//Sende die Daten als einen JSON-String:
			JSON.stringify({
				sender_id: data.sender_id,
				receiver_id: data.receiver_id,
				amount: data.amount,
				purpose: data.purpose
			})
	});
	return response;

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
