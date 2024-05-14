<script>
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	import Transaction from '$lib/Transaction.svelte';
	import TransactionList from '$lib/TransactionList.svelte';



	let transactionList = ['😘'];

	async function getTransactions() {
		let { data: transactions, error } = await supabase.from('transactions').select('*');
		transactionList = transactions;
	}

	onMount(() => {
		getTransactions();
	});
</script>

<div class="prose">
<TransactionList />
<Transaction receiver_id="123456789"
sender_id="987654321" amount="10" purpose="Pizza" created_at="2024-04-21"/>
</div>

<div>{JSON.stringify(transactionList)}</div>
