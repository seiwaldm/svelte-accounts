<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import '../app.postcss';
	import { session, theme } from '$lib/store';
	import { accountList, accounts, transactions } from '$lib/store';
	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			$session = data.session;
			document.cookie = `session=${JSON.stringify(data.session)};SameSite=Strict`;
			supabase
				.from('account_list')
				.select('*')
				.then((response) => {
					$accountList = response.data;
					document.cookie = `account_list=${JSON.stringify(response.data)};SameSite=Strict`;
				});
			supabase
				.from('accounts')
				.select('*')
				.then((response) => {
					$accounts = response.data;
					document.cookie = `accounts=${JSON.stringify(response.data)};SameSite=Strict`;
				});

			supabase
				.from('transactions')
				.select('*')
				.then((response) => ($transactions = response.data));

			// }`;
		});

		supabase.auth.onAuthStateChange((_event, _session) => {
			$session = _session;
			supabase
				.from('accounts')
				.select('*')
				.then((response) => ($accounts = response.data));
			supabase
				.from('transactions')
				.select('*')
				.then((response) => ($transactions = response.data));
			// document.cookie = `jwt=${JSON.stringify(_session)}`;
		});
	});
</script>

<div data-theme={$theme} class="min-h-screen p-3">
	<nav class="flex items-center gap-8 m-4">
		<a href="/" class="text-center">Home</a>|
		<a href="/accounts" class="text-center">Accounts</a>|
		<a href="/transactions" class="text-center">Transactions</a>|
		<a href="/login" class="text-center">Login</a>|
		<a href="/profile" class="text-center">Profile</a>|
	</nav>

	<select bind:value={$theme} class="fixed top-0 right-0">
		<option value="cyberpunk">cyberpunk</option>
		<option value="coffee">coffee</option>
		<option value="synthwave">synthwave</option>
	</select>

	<slot />
</div>
