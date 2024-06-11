<script>
	import Account from './Account.svelte';
	export let accounts = [];
</script>

{#each accounts as account}
	<Account accountName={account.designation} startingBalance={account.balance} />
{/each}
