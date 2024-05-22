<script>
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
