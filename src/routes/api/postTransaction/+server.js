const dummy = {
	sender_id: 'e2f676cc-4430-4ff1-b142-5d0c4cf81da7',
	receiver_id: 'f5eb806d-9c6d-4d32-88cd-8da9c411b333',
	amount: 10,
	purpose: 'test'
};

import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	const dummy = await request.json();

	if (dummy.amount <= 0) {
		return new Response('Amount should be greater than 0', { status: 400 });
	} else if (dummy.balance < dummy.amount) {
		return new Response('Balance is to low', { status: 400 });
	}

	const { data, error } = await supabase
		.from('transactions')
		.update([
			(dummy.receiver_id.balance = dummy.receiver_id.balance + dummy.amount),
			(dummy.sender_id.balance = dummy.sender_id.balance - dummy.amount)
		]);
}
