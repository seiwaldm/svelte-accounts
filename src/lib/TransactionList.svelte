<script>
	import { accountList, transactions } from '$lib/store';
	import Transaction from '$lib/Transaction.svelte';
</script>

<div>{JSON.stringify($transactions)}</div>
<h1>transactions</h1>
{#if $transactions}
	{#each $transactions as transaction}
		<Transaction
			sender_id={transaction.sender_id}
			receiver_id={transaction.receiver_id}
			amount={transaction.amount}
			purpose={transaction.purpose}
			created_at={transaction.created_at}
		/>
	{/each}
{/if}

<h1>transactions</h1>
