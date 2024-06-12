<script>
	import Transaction from './Transaction.svelte';
	export let transactions;
</script>


	{#each transactions as transaction}
		<Transaction
			sender_id={transaction.sender_id}
			receiver_id={transaction.receiver_id}
			amount={transaction.amount}
			purpose={transaction.purpose}
			created_at={transaction.created_at}
		/>
	{/each}


