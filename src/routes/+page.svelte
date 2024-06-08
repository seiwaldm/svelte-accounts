<script>
	import TransactionList from '$lib/TransactionList.svelte';
	import TransactionForm from '$lib/TransactionForm.svelte';
	import DummyTransaction from '$lib/DummyTransaction.svelte';
	import Transaction from '$lib/Transaction.svelte';
	import { accounts, transactions } from '$lib/store';
</script>

<DummyTransaction />

<div class="prose">
	{#if $transactions}
		<TransactionList transactions={$transactions} />
	{/if}
	{JSON.stringify($accounts)}
	{JSON.stringify($transactions)}
</div>
