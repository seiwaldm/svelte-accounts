<script>
	import TransactionList from '$lib/TransactionList.svelte';
	import TransactionForm from '$lib/TransactionForm.svelte';
	import DummyTransaction from '$lib/DummyTransaction.svelte';
	import Transaction from '$lib/Transaction.svelte';
	import { accounts, transactions } from '$lib/store';
</script>

<DummyTransaction />

<TransactionForm />
<div class="prose">

	<TransactionList />
	<Transaction
		receiver_id="123456789"
		sender_id="987654321"
		amount="10"
		purpose="Pizza"
		created_at="2024-04-21"
	/>
	{JSON.stringify($accounts)}
	{JSON.stringify($transactions)}
</div>
