<script>
	// Bitt nur Variablen importieren, die im Store deklariert und exportiert wurden. (keine sender_id, sondern natürlich alle transactions -> ihr greift unten ja auch auf die transactions zu!!!) & der Import von "stores/" ist falsch -> in anderen Dateien wird auch nicht so importiert - bitte anschauen.

	// import {sender_id} from 'stores/';
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';

	// export let transactions;
	// export let sender_id;
	// export let receiver_id;

	// let amount = transactions.map(transaction => transaction.amount);

	// die if benötigt eine weiter id, welche den derzeitigen amount zustand hat dazurechnet
	const data = {
		labels: ['Eingang', 'Ausgang'],
		datasets: [
			{
				label: 'Einnahmen und Ausgaben',
				// oben gebt ihr zwei Labels an, das heißt, dass hier unter data auch zwei Werte stehen müssen, die die beiden Labels repräsentieren... entweder könnt ihr das mit der reduce-Methode machen (2x unabhängig voneinander - für Ausgaben und für Einnahmen), oder ihr iteriert mit einer for-Schleife über die transactions und erledigt mit einer if-Anweisung die Zurechnung zum richtigen Summenwert (Einnahme oder Ausgabe) -> unabhängig davon,, welchen Weg ihr wählt, würde ich die Berechung außerhalb der data-Konstante durchführen und nur das Ergebnis hier unter data.datasets.data eintragen
				data: transactions.map((transaction) => {
					if (transaction.receiver_id === user_id) {
						return +transaction.amount; // + amount ursprünglicher Amount Einnahmen für den Benutzer
					} else if (transaction.sender_id === user_id) {
						return -transaction.amount; // - amount Ausgaben des Benutzers (negativer Betrag)
					} else {
						return 0; // Transaktionen, die nicht mit dem Benutzer verbunden sind
					}
				}),
				backgroundColor: ['rgba(159, 226, 191, 0.8)', 'rgba(222, 49, 99, 0.8)'],
				borderColor: ['rgb(159, 226, 191)', 'rgb(222, 49, 99)'],
				borderWidth: 1
			}
		]
	};
</script>

<Bar {data} />
