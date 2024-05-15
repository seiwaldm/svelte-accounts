const dummy = {
	sender_id: 'e2f676cc-4430-4ff1-b142-5d0c4cf81da7',
	receiver_id: 'f5eb806d-9c6d-4d32-88cd-8da9c411b333',
	amount: 10,
	purpose: 'test'
};

import { accounts, transactions } from '$lib/store';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	const dummy = await request.json();
	if (dummy.sender_id === transactions[0].sender_id) {
		if (dummy.amount <= 0) {
			return new Response('Amount should be greater than 0', { status: 400 });
		} else if (dummy.sender_id === accounts[0].id) {
			if (accounts[0].balance < dummy.amount) {
				return new Response('balance to low', { status: 400 });
			}
		}

		const { data, error } = await supabase.from('transactions').insert([
			{
				sender_id: dummy.sender_id,
				receiver_id: dummy.receiver_id,
				amount: dummy.amount,
				purpose: dummy.purpose
			}
		]);

		if (error)
			return new Response(
				"oh no... seems we have database issues... relax, it's not your fault! plz contact our admin...",
				{ status: 500 }
			);
		return new Response(JSON.stringify(data));
	}
}
