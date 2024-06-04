<script>
	import { transactions } from '$lib/store';
	import TransactionList from '$lib/TransactionList.svelte';
</script>

<TransactionList transactions={$transactions} />