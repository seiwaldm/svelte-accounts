<script>
	import { accounts, accountList, transactions } from '$lib/store.js';
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';

	const income = $transactions.reduce((total, transaction) => {
		if (transaction.receiver_id === $accounts[0].id) {
			return total + transaction.amount;
		} else {
			return total;
		}
	}, 0);

	const expenses = $transactions.reduce((total, transaction) => {
		if (transaction.sender_id === $accounts[0].id) {
			return total + transaction.amount;
		} else {
			return total;
		}
	}, 0);

	const data = {
		labels: ['Einnahmen', 'Ausgaben'],
		datasets: [
			{
				data: [income, expenses],
				backgroundColor: ['#36A2EB', '#FF6384'],
				borderColor: ['rgb(159, 226, 191)', 'rgb(222, 49, 99)'],
				borderWidth: 2
			}
		]
	};
	// oben gebt ihr zwei Labels an, das heißt, dass hier unter data auch zwei Werte stehen müssen, die die beiden Labels repräsentieren... entweder könnt ihr das mit der reduce-Methode machen (2x unabhängig voneinander - für Ausgaben und für Einnahmen), oder ihr iteriert mit einer for-Schleife über die transactions und erledigt mit einer if-Anweisung die Zurechnung zum richtigen Summenwert (Einnahme oder Ausgabe) -> unabhängig davon,, welchen Weg ihr wählt, würde ich die Berechung außerhalb der data-Konstante durchführen und nur das Ergebnis hier unter data.datasets.data eintragen
</script>

<Bar {data} />
