<script>
    function createAccount() {
        fetch("/api/postAccount",{
            method: "POST"
        })
    }
</script>


<!-- The button to open modal -->
<label for="my_modal_7" class="btn">New Account</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my_modal_7" class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="font-bold text-lg">New Account</h3>
		<p class="py-4">
			<label class="form-control w-full max-w-xs">
				<!-- <input
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
				/> -->
			</label>
		</p>
		<div class="modal-action">
            <button on:click={createAccount} class="btn">Create Account</button>
			<label for="my_modal_6" class="btn">Cancel</label>
		</div>
	</div>
</div>

