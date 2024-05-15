<script>
	import { accountList, transactions } from '$lib/store';
	import Transaction from '$lib/Transaction.svelte';
</script>

<div>{JSON.stringify($transactions)}</div>

<Transaction />
