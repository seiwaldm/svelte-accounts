<script>
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import {load} from '../api/deleteAccount/+server.js';

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

<button on:click={load}>Delete Account</button>