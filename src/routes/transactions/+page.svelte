<script>
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TransactionsBarChart from '$lib/TransactionsBarChart.svelte';

	let transactionList = ['😘'];

	async function getTransactions() {
		let { data: transactions, error } = await supabase.from('transactions').select('*');
		transactionList = transactions;
	}

	onMount(() => {
		getTransactions();
	});
</script>

<div>{JSON.stringify(transactionList)}</div>

<TransactionsBarChart transactions={transactionList} />
