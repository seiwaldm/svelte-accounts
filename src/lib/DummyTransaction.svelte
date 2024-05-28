<script>
	async function send() {
		const res = await fetch('/api/postTransaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender_id: 'f5eb806d-9c6d-4d32-88cd-8da9c411b333',
				receiver_id: '8eda87fb-7ab6-4906-8766-c53334b73c4a',
				amount: 100,
				purpose: 'test'
			})
		});
		console.log(res);
	}
</script>

<button on:click={send}>send</button>
