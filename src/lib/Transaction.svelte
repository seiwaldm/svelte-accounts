<script>
	import { accounts, accountList} from '$lib/store';

	export let sender_id;
	export let receiver_id;
	export let amount;
	export let purpose;
	export let created_at;

	export let user_id; // This is the current user's ID

	$: transactionClass = getClass();

	// This function determines the class based on whether the user is the receiver or the sender
	function getClass() {
		return $accounts.map(account => account.id).includes(sender_id) ? 'expense' : 'revenue';
	}

	// This function determines the sign based on whether the user is the receiver or the sender
	function getSign(transaction) {
		return transaction.receiver_id === user_id
			? `+${transaction.amount}`
			: `-${transaction.amount}`;
	}

// Name des sender_id anzeigen
let senderName = '';
$accountList.forEach(account => {
	if (account.id === sender_id) {
		senderName = account.designation;
	}
});




</script>
<hr>

<div class="collapse collapse-plus bg-base-200">
	<input type="radio" name="my-accordion-3" checked="checked" /> 
	<div class="collapse-title text-xl font-medium {transactionClass}" >
		<!-- {sender_id}  -->
		{senderName}
		| Amount: 
		{amount}
		<!--  {transactionClass} -->
	</div>
	<div class="collapse-content"> 
	  <p>{created_at} | {purpose}</p>
	</div>
</div>
<!-- {JSON.stringify($accountList)} -->



<style>
	.revenue {
		color: green;
	}
	.expense {
		color: red;
	}
</style>
