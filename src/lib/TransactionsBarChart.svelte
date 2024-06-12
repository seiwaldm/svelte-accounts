<script>
// alle Imports
	import { accounts, accountList} from '$lib/store.js';
//import barchart von chart.js
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';
//dynamische Daten für das Diagramm 
	export let transactions;

//Wie viele Einnahmen habe ich.
	const income = transactions.reduce((total, transaction) => {
		if (transaction.receiver_id === $accounts[0].id) {
			return total + transaction.amount;
		} else {
			return total;
		}
	}, 0);

//Wie viele Ausgaben habe ich.
	const expenses = transactions.reduce((total, transaction) => {
		if (transaction.sender_id === $accounts[0].id) {
			return total + transaction.amount;
		} else {
			return total;
		}
	}, 0);

//Welche Datn sollen im Diagramm dargestellt werden.
	const data = {
		//Unterüberschrift
		labels: ['Cash Flow'],
		//Welche Daten baue ich ein mit Styling
		datasets: [
			{
				label: 'Einnahmen',
				data: [income],
				backgroundColor: ['rgba(58, 238, 106, 0.4)'], // Grün
				borderColor: ['rgba(58, 238, 106, 0.7)'],
				borderWidth: 2
			},
			{
				label: 'Ausgaben',
				data: [expenses],
				font: {
					size: 18
				},
				backgroundColor: ['rgba(238, 28, 28,0.4)'], // Rot
				borderColor: ['rgba(238, 28, 28, 0.7)'],
				borderWidth: 2
			}
		]
	};
</script>

<!-- Anzeige des Diagrammes mit der Variabel data von dem oberen Block. -->
<Bar {data} />
