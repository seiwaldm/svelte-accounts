<script lang="ts">
	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '';
	let message = '';
	let isSuccess = false;
	let isError = false;

	const handleLogin = async () => {
		try {
			loading = true;
			message = '';
			isSuccess = false;
			isError = false;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			message = 'Check your email for login link!';
			isSuccess = true;
		} catch (error) {
			if (error instanceof Error) {
				message = error.message;
				isError = true;
			}
		} finally {
			loading = false;
		}
	};
</script>

<div class="card w-96 glass mx-auto mt-10">
	<figure>
		<img src="login-page.webp" alt="car!" />
	</figure>
	<div class="card-body mx-auto">
		<h2 class="card-title">Supabase + Svelte</h2>
		<p>Sign in via magic link with your email below</p>
		<form class="form-widget" on:submit|preventDefault={handleLogin}>
			<div class="form-control">
				<label for="email" class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					id="email"
					class="input input-bordered"
					type="email"
					placeholder="Your email"
					bind:value={email}
				/>
			</div>
			<div class="form-control mt-4">
				<button type="submit" class="btn btn-primary w-full" aria-live="polite" disabled={loading}>
					<span>{loading ? 'Loading' : 'Send magic link'}</span>
				</button>
			</div>
		</form>
		{#if message}
			<p class="message mt-4 {isSuccess ? 'success' : ''} {isError ? 'error' : ''}">{message}</p>
		{/if}
	</div>
</div>

<style>
	
	.message {
		padding: 0.5rem;
		border-radius: 0.25rem;
		text-align: center;
	}
	.success {
		color: #16a34a;
		background-color: #d1fae5;
		border: 1px solid #16a34a;
	}
	.error {
		color: #dc2626;
		background-color: #fee2e2;
		border: 1px solid #dc2626;
	}
</style>
