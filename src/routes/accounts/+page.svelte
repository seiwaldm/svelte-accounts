<script>
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	let accountList = ['😘'];

	async function getAccounts() {
		let { data: accounts, error } = await supabase.from('accounts').select('*');
		accountList = accounts;
	}

	onMount(() => {
		getAccounts();
	});
</script>

<div>{JSON.stringify(accountList)}</div>
