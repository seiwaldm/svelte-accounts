<script>
	import Account from './Account.svelte';
	import account from '$lib/store.js';
	export let accounts = [];

	console.log("accounts:" + accounts);
</script>

{#each accounts as account}
	<Account accountName={account.designation} startingBalance={account.balance} />
{/each}

{#if account && account.balance > 0}
  <p class="text-red-500">Account deletion failed: Balance must be 0.</p>
{/if}