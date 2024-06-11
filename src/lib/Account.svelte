<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { get } from 'svelte/store';
	import { accounts } from '$lib/store.js';
	

	export let accountName = '';
	export async function fetchAccounts() {
    let { data, error } = await supabase.from('accounts').select('*');
    if (error) {
        console.error('Error fetching accounts:', error);
    } else {
        accounts.set(data);
		console.log('Accounts fetched:', data);
    }
}
	
	export let startingBalance = 0;
	export async function deleteAccount() {
		if (startingBalance > 0) {
    console.error("Cannot delete account with positive balance.");
	alert("Cannot delete account with positive balance.");
    return;
		}
  let { data, error } = await supabase.from('accounts').delete().eq('designation', accountName);
  if (error) {
    console.error('Error deleting account:', error);
  } else {
    console.log('Account deleted:', data);
    window.location.reload();
  }
}

export async function setAccountBalanceToZero(accountDesignation) {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .update({ balance: 0 })
      .eq('designation', accountDesignation);

    if (error) {
      throw error;
    }

    console.log('Account balance updated successfully:', data);
  } catch (error) {
    console.error('Error updating account balance:', error);
  }
}

</script>

<div class="bg-base-200 p-4 rounded-lg shadow-lg flex justify-between items-center">
	<div>
		<h1 class="text-xl font-medium">{accountName}</h1>

		<p>Balance: {startingBalance} €</p>
	</div>
	<button on:click={deleteAccount} class="btn btn-error btn-sm ml-4">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M10 2a1 1 0 00-1 1v1H5a1 1 0 100 2h10a1 1 0 100-2h-4V3a1 1 0 00-1-1zM4 7a1 1 0 011 1v8a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 112 0v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a1 1 0 011-1z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</div>
