<script>
	import { transactions } from '$lib/store';

	export let user_id; // This is the current user's ID

	// This function determines the class based on whether the user is the receiver or the sender
	function getClass(transaction) {
		return transaction.receiver_id === user_id ? 'revenue' : 'expense';
	}

	// This function determines the sign based on whether the user is the receiver or the sender
	function getSign(transaction) {
		return transaction.receiver_id === user_id
			? `+${transaction.amount}`
			: `-${transaction.amount}`;
	}
</script>

<div>{JSON.stringify($transactions)}</div>
<h1>Transactions</h1>
{#if $transactions}
	{#each $transactions as transaction}
		<div>
			<span>{transaction.receiver_id}</span>
			<span>{transaction.sender_id}</span>
			<span class={getClass(transaction)}>
				{getSign(transaction)}
			</span>
			<span>{transaction.purpose}</span>
			<span>{transaction.created_at}</span>
		</div>
	{/each}
{/if}

<style>
	.revenue {
		color: green;
	}
	.expense {
		color: red;
	}
</style>
