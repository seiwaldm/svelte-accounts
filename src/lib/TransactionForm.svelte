<script>
	import { accounts, accountList } from '$lib/store';

	let sender = $accounts[0].id;
	let receiverID = '';
	let amount = '';
	let purpose = '';
	let receiverName = 'Empfänger';

	let list = [...$accountList].sort((a, b) => {
		if (a.designation.toLowerCase() < b.designation.toLowerCase()) {
			return -1;
		}
		if (a.designation.toLowerCase() > b.designation.toLowerCase()) {
			return 1;
		}
		return 0;
	});

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
				amount: amount,
				purpose: purpose
			})
		});
		console.log(res);
	}

	function setReceiver(id, name) {
		receiverID = id;
		receiverName = name;
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
				<div class="dropdown dropdown-right">
					<button tabindex="-1" class="btn btn-wide">{receiverName}</button>
					<ul
						tabindex="-1"
						z-index="5"
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						{#each list as account}
							<li>
								<button class="btn" on:click={() => setReceiver(account.id, account.designation)}>
									{account.designation}
								</button>
							</li>
						{/each}
					</ul>
				</div>

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
<div />
