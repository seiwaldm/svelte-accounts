<script>
	import { accounts, accountList } from '$lib/store';
	import Icon from '@iconify/svelte';

	let sender = $accounts[0].id;
	let receiverID = '';
	let amount = '';
	let purpose = '';
	let receiverName = 'Empfänger';

	let hidden = true;
	let buttonText = 'Neue Überweisung';
	let error = '';

	let list = $accountList;

	list = [...$accountList].sort((a, b) => {
		if (a.designation.toLowerCase() < b.designation.toLowerCase()) {
			return -1;
		}
		if (a.designation.toLowerCase() > b.designation.toLowerCase()) {
			return 1;
		}
		return 0;
	});
	function submitTransaction() {
		if (receiverID === '' || amount === '' || purpose === '') {
			error = 'Bitte füllen Sie alle Felder aus';
		} else if (!Number.isInteger(amount)) {
			error = 'Der Betrag muss eine ganze Zahl sein';
		} else if (amount <= 0) {
			error = 'Der Betrag muss größer als 0 sein';
		} else {
			error = '';
			send();
		}
		console.log(receiverID, amount, purpose, error);
		resetForm();
	}

	async function send() {
		const res = await fetch('/api/postTransaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender_id: sender,
				receiver_id: receiverID,
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

	function openForm() {
		hidden = !hidden;
		resetForm();
		if (hidden) {
			buttonText = 'Neue Überweisung';
		} else {
			buttonText = 'Verwerfen';
		}
	}

	function resetForm() {
		amount = '';
		purpose = '';
		receiverID = '';
		receiverName = 'Empfänger';
	}
</script>

<Icon icon="solar:hand-money-outline" width="10em" height="10em" />

<button class="btn" on:click={openForm}>{buttonText}</button>

{#if !hidden}
	<div class="card">
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
								<button
									class="btn max-w-xs"
									on:click={() => setReceiver(account.id, account.designation)}
								>
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

		<button class="btn max-w-xs" onclick="my_modal_3.showModal()" on:click={submitTransaction}
			>Freigeben</button
		>
		<dialog id="my_modal_3" class="modal">
			{#if error !== ''}
				<div class="modal-box">
					<form method="dialog">
						<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
					</form>
					<p class="py-4">{error}</p>
				</div>
			{:else}
				<div class="modal-box">
					<form method="dialog">
						<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
					</form>
					<span class="py-4">
						<Icon icon="formkit:check" class="inline" /> Die Transaktion wurde freigegeben
					</span>
				</div>
			{/if}
		</dialog>
	</div>
{/if}
