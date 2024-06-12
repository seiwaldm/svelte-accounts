<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { get } from 'svelte/store';
    import { accounts } from '$lib/store.js';
    
    export let accountName = '';
    export let accountPurpose = '';
    export let startingBalance = 0;

    let isEditing = false;
    let newAccountName = accountName;
    let newAccountPurpose = accountPurpose;

    async function fetchAccounts() {
        let { data, error } = await supabase.from('accounts').select('*');
        if (error) {
            console.error('Error fetching accounts:', error);
        } else {
            accounts.set(data);
            console.log('Accounts fetched:', data);
        }
    }

    async function deleteAccount() {
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

    async function saveChanges() {
        let { data, error } = await supabase.from('accounts')
            .update({ designation: newAccountName})
            .eq('designation', accountName);
        if (error) {
            console.error('Error updating account:', error);
        } else {
            console.log('Account updated:', data);
            accountName = newAccountName;
            accountPurpose = newAccountPurpose;
            isEditing = false;
            fetchAccounts();
            window.location.reload();
        }
    }

    function enableEditMode() {
        isEditing = true;
    }

    function cancelEdit() {
        isEditing = false;
        newAccountName = accountName;
        newAccountPurpose = accountPurpose;
    }
</script>

<div class="bg-base-200 p-4 rounded-lg shadow-lg flex justify-between items-center">
    {#if isEditing}
        <div>
            <input
                type="text"
                class="input input-bordered mr-2"
                bind:value={newAccountName}
                placeholder="New Account Name"
            />
        </div>
        <div class="flex items-center space-x-2">
            <button on:click={saveChanges} class="btn btn-success btn-sm">Save</button>
            <button on:click={cancelEdit} class="btn btn-secondary btn-sm">Cancel</button>
        </div>
    {:else}
        <div>
            <h1 class="text-xl font-medium">{accountName}</h1>
            <p>Balance: {startingBalance} €</p>
        </div>
        <div class="flex items-center space-x-2">
            <button on:click={enableEditMode} class="btn btn-warning btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0l-10 10a2 2 0 00-.514.858l-1 4a1 1 0 001.237 1.237l4-1a2 2 0 00.858-.514l10-10a2 2 0 000-2.828l-2-2zm-2.828 4.828L15 6.414 13.586 5 11 7.586V9h1.414zM5 18h10a1 1 0 000-2H5a1 1 0 000 2z"/>
                </svg>
            </button>
            <button on:click={deleteAccount} class="btn btn-error btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1H5a1 1 0 100 2h10a1 1 0 100-2h-4V3a1 1 0 00-1-1zM4 7a1 1 0 011 1v8a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 112 0v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    {/if}
</div>

