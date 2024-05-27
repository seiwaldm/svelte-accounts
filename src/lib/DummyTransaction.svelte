<script>
	async function send() {
		const res = await fetch('/api/postTransaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender_id: '2',
				receiver_id: '1',
				amount: 100,
				purpose: 'test'
			})
		});
		console.log(res);
	}
</script>

<button on:click={send}>send</button>
