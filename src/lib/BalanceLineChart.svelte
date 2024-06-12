<script>
	import { Line } from 'svelte-chartjs'; // line chart von chart.js
	import { accounts } from '$lib/store'; // importiere transactions und accounts aus store
	import 'chart.js/auto'; // importiert chart.js
	import 'chartjs-adapter-date-fns'; // importiert date-fns für chart.js
	import { onMount } from 'svelte'; // importiert onMount, um Funktionen auszuführen, wenn Komponente gemountet wird

	export let transactions; //exportiert transactions

	//Absteigende Sortierung!
	let sortedTransactions = null;
	let currentBalance = 0; //setzt aktuellen Kontostand auf Kontostand des ersten Accounts

	let calculatedBalance = []; //Array für berechneten Kontostand

	let chartOptions = {
		//Optionen für Chart
		scales: {
			//Skalierung
			x: {
				//x-Achse
				type: 'time' //Typ Zeit
			}
		}
	};
	const chartData = {
		//Daten für Chart
		datasets: [
			//Datensätze
			{
				data: calculatedBalance //Daten sind berechneter Kontostand, wird oben berechnet
			}
		]
	};

	onMount(() => {
		currentBalance = $accounts[0].balance;
		sortedTransactions = transactions.sort(
			//sortiert transactions nach Datum, absteigend
			(a, b) => new Date(b.created_at) - new Date(a.created_at) //sortiert nach Datum
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
		document.body.style.zoom = '96%';
	}); // Close the onMount function
</script>

<Line id="chart" data={chartData} options={chartOptions} />
