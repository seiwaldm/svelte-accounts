<script>
	import BalanceLineChart from '$lib/BalanceLineChart.svelte';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import TransactionsBarChart from '$lib/TransactionsBarChart.svelte';
	import TransactionList from '$lib/TransactionList.svelte';
	//import { Datepicker } from 'svelte-calendar';
	import RangeCalendar from '$lib/components/ui/range-calendar/range-calendar.svelte';
	import { getLocalTimeZone, today } from '@internationalized/date';

	let transactionList = [];
	let filteredData = [];
	let filterType = '';
	let filterValue = '';

	async function getTransactions() {
		let { data: transactions, error } = await supabase.from('transactions').select('*');
		if (error) {
			console.error('Error fetching transactions:', error);
		} else {
			transactionList = transactions;
			filteredData = [...transactionList];
		}
	}

	onMount(() => {
		getTransactions();
	});

	function applyFilter() {
		if (filterType === 'date') {
			if (value.start && value.end) {
				const startDate = new Date(value.start);
				const endDate = new Date(value.end);
				filteredData = transactionList.filter((transaction) => {
					const transactionDate = new Date(transaction.created_at);
					return transactionDate >= startDate && transactionDate <= endDate;
				});
			} else {
				filteredData = [...transactionList];
			}
		} else if (filterType === 'amount') {
			filteredData = transactionList.filter((transaction) => transaction.amount == filterValue);
		} else if (filterType === 'purpose') {
			filteredData = transactionList.filter((transaction) => {
				if (transaction.purpose) {
					return transaction.purpose.toLowerCase().includes(filterValue.toLowerCase());
				}
				return false;
			});
		} else {
			filteredData = [...transactionList];
		}
	}

	// let value = { start, end };
	let value = {};
</script>

<div class="navbar bg-base-100 mb-4">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">Transactions</a>
	</div>
	<div class="flex-none gap-2 items-center">
		<label for="filterType" class="text-white-700">Filter by:</label>
		<div class="form-control">
			<select id="filterType" bind:value={filterType} class="select select-bordered">
				<option value="amount">Amount</option>
				<option value="date">Date</option>
				<option value="purpose">Word Search</option>
			</select>
		</div>
		{#if filterType === 'date'}
			<div class="form-control">
				<button on:click={applyFilter} class="btn btn-ghost">Apply Filter</button>
				<div class="rounded-md border max-w-min text-black bg-slate-300">
					<RangeCalendar bind:value />
				</div>
			</div>
		{:else}
			<div class="form-control align-middle">
				<input
					type="text"
					placeholder="Enter filter value"
					bind:value={filterValue}
					class="input input-bordered w-24 md:w-auto"
				/>
			</div>
			<button on:click={applyFilter} class="btn btn-ghost">Apply Filter</button>
		{/if}
	</div>
</div>

{#if transactionList.length === 0}
	<span class="loading loading-bars loading-lg text-primary">Loading...</span>
{:else}
	{#key filteredData}
		<TransactionList transactions={filteredData} />
		<TransactionsBarChart transactions={filteredData} />
	{/key}
{/if}

<!-- <BalanceLineChart transactions={filteredData} /> -->
