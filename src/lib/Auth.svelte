<script lang="ts">
	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '';

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
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
	</div>
</div>

<style>
	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
	.mt-10 {
		margin-top: 2.5rem;
	}
</style>
