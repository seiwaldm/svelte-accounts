<script>
	import { accounts, accountList } from '$lib/store';

	export let sender_id;
	export let receiver_id;
	export let amount;
	export let purpose;
	export let created_at;

	export let user_id; // This is the current user's ID

	$: transactionClass = getClass();

	// This function determines the class based on whether the user is the receiver or the sender
	function getClass() {
		return $accounts.map((account) => account.id).includes(sender_id) ? 'expense' : 'revenue';
	}

	// This function determines the sign based on whether the user is the receiver or the sender
	function getSign(transaction) {
		return transaction.receiver_id === user_id
			? `+${transaction.amount}`
			: `-${transaction.amount}`;
	}

	// Name des sender_id anzeigen
	let senderName = '';
	$accountList.forEach((account) => {
		if (account.id === sender_id) {
			senderName = account.designation;
		}
	});

	// Name des receiver_id anzeigen
	let receiverName = '';
	$accountList.forEach((account) => {
		if (account.id === receiver_id) {
			receiverName = account.designation;
		}
	});

	// Format the date and time
	function formatDateTime(dateTime) {
		const date = new Date(dateTime);
		const formattedDate = date.toLocaleDateString('de-DE'); // Format date as 'dd.MM.yyyy'
		const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); // Format time as 'HH:mm'
		return `${formattedDate} ${formattedTime}`;
	}
</script>

<div class="collapse collapse-plus bg-base-200">
	<input type="radio" name="my-accordion-3" checked="checked" />
	<div class="collapse-title text-xl font-medium {transactionClass}">
		From {senderName} to {receiverName}

		| Amount:
		{amount}
	</div>
	<div class="collapse-content">
		<p>{formatDateTime(created_at)} | {purpose}</p>
	</div>
	<hr />
</div>

<style>
	.revenue {
		color: green;
	}
	.expense {
		color: red;
	}
</style>
