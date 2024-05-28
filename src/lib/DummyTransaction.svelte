<script>
	async function send() {
		const res = await fetch('/api/postTransaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender_id: '650e6568-29e7-4aa1-ace0-8cfacc9e3823',
				receiver_id: 'e2f676cc-4430-4ff1-b142-5d0c4cf81da7',
				amount: 100,
				purpose: 'test'
			})
		});
		console.log(res);
	}
</script>

<button on:click={send}>send</button>
