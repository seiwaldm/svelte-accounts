<script>
	import { supabase } from '$lib/supabase';

	let promise = supabase.from('countries').select();
</script>

<div class="prose">
	<a href="/api/hello">test</a>
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
