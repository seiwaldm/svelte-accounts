<!-- The button to open modal -->
<label for="my_modal_6" class="btn">Neue Überweisung</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Neue Überweisung</h3>
		<p class="py-4">
			<label class="form-control w-full max-w-xs">
				<input
					type="text"
					placeholder="Verwendungszweck"
					class="input input-bordered w-full max-w-xs"
				/>
			</label>
			<label class="swap swap-flip text-9xl">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" />
				<div class="swap-on text-center">SWP ist toll</div>
				<div class="swap-off text-center">🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻🧑‍💻</div>
			</label>
		</p>
		<div class="modal-action">
			<label for="my_modal_6" class="btn">verwerfen</label>
		</div>
	</div>
</div>
