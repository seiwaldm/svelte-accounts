<script>
	import TransactionBarChart from '$lib/TransactionsBarChart.svelte';
	import {transactions} from '$lib/store.js';
</script>

<TransactionBarChart   transactions={$transactions}/>

