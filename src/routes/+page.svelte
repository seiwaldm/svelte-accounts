<script>
	import BalanceLineChart from '$lib/BalanceLineChart.svelte';
	import TransactionList from '$lib/TransactionList.svelte';
	import TransactionsBarChart from '$lib/TransactionsBarChart.svelte';
	import Transaction from '$lib/Transaction.svelte';
	import { supabase } from '$lib/supabase';

	let promise = supabase.from('countries').select();
	let names = supabase.from('rabbits').select();

	let name = '';

	async function sendName() {
		const response = await fetch('/api/sendName', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});
		const data = await response.text();
		console.log(data);
		name = '';
		names = supabase.from('rabbits').select();
	}
</script>

<div class="prose">
	<TransactionList />
	<Transaction
		receiver_id="123456789"
		sender_id="987654321"
		amount="10"
		purpose="Pizza"
		created_at="2024-04-21"
	/>
	<BalanceLineChart />

	<TransactionsBarChart />
	<h1>APIs</h1>
	<ul>
		<li><a href="/api/hello?name=Markus">Link zur API mit Query-Parameter</a></li>
		<li><a href="/api/hello/Markus">Link zur API mit Route-Parameter</a></li>
	</ul>

	<form>
		<h2>All my rabbits</h2>
		<input type="text" bind:value={name} /><br /><button class="btn" on:click={sendName}
			>Add rabbit!</button
		>
	</form>

	<h2>Rabbit names</h2>
	{#await names}
		<span class="loading loading-bars loading-lg text-primary" />
	{:then result}
		<ul>
			{#each result.data as rabbit (rabbit.id)}
				<li>{rabbit.name}</li>
			{/each}
		</ul>
	{/await}

	<hr />
	<h1>Aufgaben:</h1>

	<ul>
		<li>
			anstatt eines JS-Objekts, das auf der Seite dargestellt wird, möchte ich eine Liste aller
			Länder
		</li>
		<li>integriere einen Loading Spinner oÄ von daisyUI in dein Projekt</li>
		<li>gib die Vercel-URL zu deinem Projekt via Aufgabe im Teams ab</li>
	</ul>
</div>

{#await promise}
	<span class="loading loading-bars loading-lg text-primary" />
{:then result}
	<ul>
		{#each result.data as country (country.id)}
			<li>{country.name}</li>
		{/each}
	</ul>
{/await}
