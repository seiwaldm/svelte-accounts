<script>

import { onMount } from 'svelte';
	import Drawer from '$lib/Drawer.svelte';
	let drawerOpen = false;

	const toggleDrawer = () => {
		drawerOpen = !drawerOpen;
	};

    </script>

<button on:click={toggleDrawer}>Toggle Drawer</button>

<Drawer {isOpen} on:close={() => (drawerOpen = false)}>
	<h2>Kontenauswahl</h2>
	<p></p>
</Drawer>