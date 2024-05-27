<script>
	import BalanceLineChart from '$lib/BalanceLineChart.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TransactionsBarChart from '$lib/TransactionsBarChart.svelte';

	import Transaction from '$lib/Transaction.svelte';

	let transactionList = ['😘'];
	let transaction = supabase.from('transactions').select();

	async function getTransactions() {
		let { data: transactions, error } = await supabase.from('transactions').select('*');
		transactionList = transactions;
	}

	
	onMount(() => {
		getTransactions();
	});
</script>




<div>{JSON.stringify(transactionList)}</div>

{#await transaction}
	<span class="loading loading-bars loading-lg text-primary" />
{:then result}
	<ul>
		{#each result.data as transaction (transaction.id)}
			<li>{transaction.id}</li>
			<li>{transaction.purpose}</li>
			<li>{transaction.amount}</li>
			<li>{transaction.sender_id}</li>
		{/each}
	</ul>
{/await}

<TransactionsBarChart transactions={transactionList} />

<BalanceLineChart transactions={transactionList} />
