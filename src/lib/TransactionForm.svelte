<script>
	import { accounts } from '$lib/store';

	let sender = $accounts[0].id;
	let receiver = '';
	let amount = '';
	let purpose = '';

	function submitTransaction() {
		if (receiver === '' || amount === '' || purpose === '') {
			alert('Bitte füllen Sie alle Felder aus');
		} else if (!Number.isInteger(amount)) {
			alert('Bitte geben Sie eine Zahl als Betrag ein');
		} else if (amount <= 0) {
			alert('Bitte geben Sie einen positiven Betrag ein');
		} else {
			send();
		}
	}

	async function send() {
		const res = await fetch('/api/postTransaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender_id: sender,
				receiver_id: receiver,
				amount: amout,
				purpose: purpose
			})
		});
		console.log(res);
	}
</script>

<!-- The button to open modal -->
<label for="my_modal_6" class="btn">Neue Überweisung</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Neue Überweisung</h3>
		<p class="py-4">
			<label class="form-control w-full max-w-xs">
				<input
					type="text"
					placeholder="Empfänger"
					class="input input-bordered w-full max-w-xs"
					bind:value={receiver}
				/>
				<input
					type="number"
					placeholder="Betrag"
					class="input input-bordered w-full max-w-xs"
					bind:value={amount}
				/>
				<input
					type="text"
					placeholder="Verwendungszweck"
					class="input input-bordered w-full max-w-xs"
					bind:value={purpose}
				/>
			</label>
		</p>
		<div class="modal-action">
			<button class="btn" on:click={submitTransaction}>Freigeben</button>
			<label for="my_modal_6" class="btn">verwerfen</label>
		</div>
	</div>
</div>
<!-- Rabbits beispiel anschauen -->
