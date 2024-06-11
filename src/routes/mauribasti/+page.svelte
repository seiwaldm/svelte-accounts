<script>
	import Account from "$lib/Account.svelte";

    function createAccount() {
        fetch("/api/postAccount", {
            method: "POST",
            body: JSON.stringify({
                accountName,
                accountPurpose,
                startingBalance
            })
        }).then(response => {
            if (response.ok) {
                // Close the modal
                document.getElementById("my_modal_7").checked = false;
            } else {
                console.error('Failed to create account');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    export let accountName = '';
    export let accountPurpose = '';
    export let startingBalance = 0;

    let showStartingBalance = false;
</script>


<label for="my_modal_7" class="btn">New Account</label>


<input type="checkbox" id="my_modal_7" class="modal-toggle" />
<div class="modal" role="dialog">
    <div class="modal-box">
        <h3 class="font-bold text-lg">New Account</h3>
        <p class="py-4">
            <div class="form-control w-full max-w-xs">
                <label class="input-group">
                    <input
                        type="text"
                        placeholder="Account Name"
                        class="input input-bordered w-full max-w-xs"
                        bind:value={accountName}
                    />
                </label>
                <label class="input-group">
                    <input
                        type="text"
                        placeholder="Purpose"
                        class="input input-bordered w-full max-w-xs"
                        bind:value={accountPurpose}
                    />
                </label>
                <label class="input input-bordered w-full max-w-xs">
                    <input
                        type="checkbox"
                        class="mr-2"
                        bind:checked={showStartingBalance}
                    />
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
