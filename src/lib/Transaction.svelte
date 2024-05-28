<script>
	export let receiver_id;
	export let sender_id;
	export let amount;
	export let purpose;
	export let created_at;
</script>

<div>
	<span>{receiver_id}</span>
	<span>{sender_id}</span>
	<span>-{amount}</span>
	<span>{purpose}</span>
	<span>{created_at}</span>
</div>

<style>
	.revenue {
		color: green;
	}
	.expense {
		color: red;
	}
</style>
