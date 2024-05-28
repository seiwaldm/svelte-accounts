<script>
	import BalanceLineChart from '$lib/BalanceLineChart.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TransactionsBarChart from '$lib/TransactionsBarChart.svelte';
	import RangeCalendar from '$lib/components/ui/range-calendar/range-calendar.svelte';
	import RangeCalendarCell from '$lib/components/ui/range-calendar/range-calendar-cell.svelte';
	import RangeCalendarDay from '$lib/components/ui/range-calendar/range-calendar-day.svelte';
	import RangeCalendarHeader from '$lib/components/ui/range-calendar/range-calendar-header.svelte';

	let transactionList = [];
	let filteredData = [];
	let filterType = '';
	let filterValue = '';
	let startDate = '';
	let endDate = '';
	let result = '';

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
			// } else if (filterType === 'date') {
			// RangeCalendar.show();
			// filteredData = transactionList.filter((transaction) =>
			// 	transaction.created_at.split('T')[0].includes(filterValue)
			// );
		} else if (filterType === 'date') {
			if (startDate && endDate) {
				const start = new Date(startDate).getTime();
				const end = new Date(endDate).getTime();

				filteredData = transactionList.filter((transaction) => {
					const transactionDate = new Date(transaction.created_at).getTime();
					return transactionDate >= start && transactionDate <= end;
				});
			} else {
				filteredData = [...transactionList];
			}
		} else if (filterType === 'purpose') {
			filteredData = transactionList.filter((transaction) => {
				if (transaction.purpose) {
					return transaction.purpose.toLowerCase().includes(filterValue.toLowerCase());
				}
				return false;
			});
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
	<div class="rounded-md border max-w-min text-black bg-slate-300">
		{#if filterType === 'date'}
			<RangeCalendar {startDate} {endDate} on:change={applyFilter} />
			<input type="date" bind:value={startDate} />
			<input type="date" bind:value={endDate} />
		{/if}
	</div>
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
