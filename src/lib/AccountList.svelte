<script>
    import Account from "./Account.svelte";
    export let accounts = [];
</script>

{#each accounts as account}
    <Account
        accountName={account.designation}
        accountPurpose={account.purpose}
        startingBalance={account.balance}
    />
{/each}
