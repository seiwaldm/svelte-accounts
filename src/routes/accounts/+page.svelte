<script>
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import AccountList from '$lib/AccountList.svelte';
	import accounts from '$lib/AccountList.svelte';
	import { set } from 'date-fns';

	export let accountName = '';
	export let startingBalance = 0;
	export let accountList = [];

	export let transfereFrom = '';
	export let transfereTo = '';
	export let transfereAmount = 0;

	export let accountDesignation = '';


	async function getAccounts() {
		let { data: accounts, error } = await supabase.from('accounts').select('*');
		if (error) {
			console.error('Error fetching accounts:', error);
		} else {
			accountList = accounts;
		}
	}

	onMount(() => {
		getAccounts();
	});

	async function createAccount() {
		fetch('/api/postAccount', {
			method: 'POST',
			body: JSON.stringify({ accountName, startingBalance })
		})
			.then((response) => {
				if (response.ok) {
					// Close the modal
					document.getElementById('my_modal_7').checked = false;

					// Update accountList with new account
					accountList = [
						...accountList,
						{
							designation: accountName,
							balance: startingBalance
						}
					];
				} else {
					console.error('Failed to create account');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	async function transfere(){
		fetch('/api/transfereAccount', {
			method: 'PATCH',
			body: JSON.stringify({ transfereFrom, transfereTo, transfereAmount })
		})
			.then((response) => {
				if (response.ok) {
					// Close the modal
					document.getElementById('my_modal_8').checked = false;

				// 	// Update accountList with new account
				// 	accountList = [
				// 		...accountList,
				// 		{
				// 			designation: transfereFrom,
				// 			balance: transfereAmount
				// 		},
				// 		{
				// 			designation: transfereTo,
				// 			balance: transfereAmount
				// 		}
				// 	];
				// } else {
				// 	console.error('Failed to create account');
				 }
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	let showStartingBalance = false;

	async function setAccountBalanceToZero(designation) {
  try {
    // Check if an account with the provided designation exists
    const accountToUpdate = accountList.find((account) => account.designation === designation);

    if (!accountToUpdate) {
      console.warn(`Account with designation "${designation}" not found.`);
      return; // Base case: Stop recursion if account not found
    }

    const { data, error } = await supabase
      .from('accounts')
      .update({ balance: 0 })
      .eq('designation', designation);

    if (error) {
      throw error;
    }

    console.log('Account balance updated successfully:', data);
	document.getElementById('my_modal_9').checked = false;


    accountList = accountList.map((account) => {
      if (account.designation === designation) {
        return { ...account, balance: 0 }; 
      }
      return account;
    });
  } catch (error) {
    console.error('Error updating account balance:', error);
  }
}

</script>


<label for="my_modal_9" class="btn">Set Acc balance 0</label>

<input type="checkbox" id="my_modal_9" class="modal-toggle" />

<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Set balance 0</h3>
		<p class="py-4" />
		<div class="form-control w-full max-w-xs">
			<label class="input-group">
				<input
					type="text"
					placeholder="Account Name"
					class="input input-bordered w-full max-w-xs"
					bind:value={accountDesignation}
				/>
			</label>
		</div>
		<div class="modal-action">
			<button on:click={setAccountBalanceToZero(accountDesignation)} class="btn">Ok</button>
			<label for="my_modal_9" class="btn">Cancel</label>
		</div>
	</div>
</div>
				

<label for="my_modal_8" class="btn">Transfer Balance</label>

<input type="checkbox" id="my_modal_8" class="modal-toggle" />

<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Transfer Balance</h3>
		<p class="py-4" />
		<div class="form-control w-full max-w-xs">
			<label class="input-group">
				<input
					type="text"
					placeholder="From Account"
					class="input input-bordered w-full max-w-xs"
					value={transfereFrom}
				/>
			</label>
			<label class="input-group">
				<input
					type="text"
					placeholder="To Account"
					class="input input-bordered w-full max-w-xs"
					value={transfereTo}
				/>
			</label>
			<label class="input-group">
				<input
					type="number"
					placeholder="Betrag"
					class="input input-bordered w-full max-w-xs"
					bind:value={transfereAmount}
				/>
			</label>
		</div>
		<div class="modal-action">
			<button on:click={transfere} class="btn">Transfer</button>
			<label for="my_modal_8" class="btn">Cancel</label>
		</div>
	</div>
</div>

<label for="my_modal_7" class="btn">New Account</label>

<input type="checkbox" id="my_modal_7" class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="font-bold text-lg">New Account</h3>
		<p class="py-4" />
		<div class="form-control w-full max-w-xs">
			<label class="input-group">
				<input
					type="text"
					placeholder="Account Name"
					class="input input-bordered w-full max-w-xs"
					bind:value={accountName}
				/>
			</label>

			<label class="input input-bordered w-full max-w-xs">
				<input type="checkbox" class="mr-2" bind:checked={showStartingBalance} />
				<span>Starting Balance</span>
			</label>
			{#if showStartingBalance}
				<label class="input-group">
					<input
						type="number"
						placeholder="Betrag"
						class="input input-bordered w-full max-w-xs"
						bind:value={startingBalance}
					/>
				</label>
			{/if}
		</div>
		<div class="modal-action">
			<button on:click={createAccount} class="btn">Create Account</button>
			<label for="my_modal_7" class="btn">Cancel</label>
		</div>
	</div>
</div>
<hr />
<div>
	{#if accountList.length > 0}
		<AccountList accounts={accountList} />
	{/if}

	
</div>
