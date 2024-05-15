<script>
	import BalanceLineChart from '$lib/BalanceLineChart.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TransactionsBarChart from '$lib/TransactionsBarChart.svelte';

	let transactionList = [];
	let filteredData = [];
	let filterType = '';
	let filterValue = '';

	async function getTransactions() {
		let { data: transactions, error } = await supabase.from('transactions').select('*');

		transactionList = transactions;
		filteredData = [...transactionList];
	}

	onMount(() => {
		getTransactions();
	});

	function applyFilter() {
		if (!filterValue) {
			filteredData = [...transactionList];
			return;
		}

		if (filterType === 'amount') {
			filteredData = transactionList.filter((transaction) => transaction.amount == filterValue);
		} else if (filterType === 'date') {
			filteredData = transactionList.filter((transaction) =>
				transaction.created_at.includes(filterValue)
			);
		} else if (filterType === 'purpose') {
			filteredData = transactionList.filter((transaction) =>
				transaction.purpose.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
	}
</script>

<div>
	<label for="filterType">Filter by:</label>
	<select id="filterType" bind:value={filterType}>
		<option value="amount">Amount</option>
		<option value="date">Date</option>
		<option value="purpose">Word Search</option>
	</select>

	<input type="text" bind:value={filterValue} placeholder="Enter filter value" />
	<button on:click={applyFilter}>Apply Filter</button>
</div>

{#if transactionList.length === 0}
	<span class="loading loading-bars loading-lg text-primary">Loading...</span>
{:else}
	<ul>
		{#each filteredData as transaction (transaction.id)}
			<li>ID: {transaction.id}</li>
			<li>Date: {transaction.created_at}</li>
			<li>Purpose: {transaction.purpose}</li>
			<li>Amount: {transaction.amount}</li>
			<li>Sender ID: {transaction.sender_id}</li>
		{/each}
	</ul>
{/if}

<!-- <TransactionsBarChart transactions={filteredData} />
<BalanceLineChart transactions={filteredData} /> -->
