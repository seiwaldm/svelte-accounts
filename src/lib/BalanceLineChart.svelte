<script>
	import { Line } from 'svelte-chartjs';
	import { accounts } from '$lib/store';
	import 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	export let transactions;

	//Absteigende Sortierung!
	let sortedTransactions = null;
	let currentBalance = 0; //setzt aktuellen Kontostand auf Kontostand des ersten Accounts

	let calculatedBalance = []; //Array für berechneten Kontostand

	let chartOptions = {
		//Optionen für Chart
		scales: {
			x: {
				type: 'time' //x-Achse ist Zeitachse
			}
		}
	};
	const chartData = {
		//Daten für Chart
		datasets: [
			{
				data: calculatedBalance //Daten sind berechneter Kontostand
			}
		]
	};

	onMount(() => {
		currentBalance = $accounts[0].balance;
		sortedTransactions = transactions.sort(
			//sortiert transactions nach Datum, absteigend
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		);
		//wird ausgeführt, wenn Komponente gemountet wird (also wenn sie angezeigt wird)
		sortedTransactions.forEach((transaction) => {
			//geht alle Transaktionen durch, sortiert nach Datum
			if (transaction.sender_id === $accounts[0].id) {
				currentBalance += transaction.amount; //wir gehen von hinten nach vorne vor, also plus für Ausgaben
				calculatedBalance.push({
					//fügt x und y Wert zum Array hinzu
					x: transaction.created_at, //x-Wert ist das Datum der Transaktion
					y: currentBalance //y-Wert ist der aktuelle Kontostand
				});
				calculatedBalance = calculatedBalance; //setzt Array auf sich selbst, um es zu aktualisieren, da Svelte sonst keine Änderung erkennt
			} else if (transaction.receiver_id === $accounts[0].id) {
				//wenn receiver_id des Transactions gleich id des ersten Accounts ist, dann...; wird nur für Testzwecke verwendet
				currentBalance -= transaction.amount; //wir gehen von hinten nach vorne vor, und rechnen deshalb minus für Einnahmen (zurückrechnen)
				calculatedBalance.push({
					//fügt x und y Wert zum Array hinzu, wie oben
					x: transaction.created_at,
					y: currentBalance
				});
				calculatedBalance = calculatedBalance;
			}
		});
		// document.body.style.zoom = '96%';
	});
</script>

<Line id="chart" data={chartData} options={chartOptions} />
