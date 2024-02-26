<script>
	import { supabase } from '$lib/supabase';

	let promise = supabase.from('countries').select();
</script>

<h1>Aufgaben:</h1>

<ul>
	<li>
		anstatt eines JS-Objekts, das auf der Seite dargestellt wird, möchte ich ein Liste aller Länder
	</li>
	<li>integriere einen Loading Spinner oÄ von daisyUI in dein Projekt</li>
	<li>gibt die Vercel-URL zu deinem Projekt via Aufgabe im Teams ab</li>
</ul>

{#await promise}
	<div>...loading</div>
{:then result}
	<div>{JSON.stringify(result)}</div>
{/await}
