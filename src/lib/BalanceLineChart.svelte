<script>
	import { Line } from 'svelte-chartjs';
	import { accounts } from '$lib/store';
	import 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	export let transactions;

	let sortedTransactions = [];
	let currentBalance = 0; //Aktueller Kontostand
	let calculatedBalance = []; //Array für berechneten Kontostand

	const ZOOM_LEVEL = '96%'; //Zoom-Level für Chart

	let chartOptions = {
		scales: {
			x: {
				type: 'time' //x-Achse ist Zeitachse
			}
		}
	};

	const chartData = {
		datasets: [
			{
				data: calculatedBalance //Daten sind berechneter Kontostand
			}
		]
	};

	const calculateBalance = () => {
		currentBalance = $accounts[0].balance;
		sortedTransactions = transactions.sort(
			(transaction1, transaction2) =>
				new Date(transaction2.created_at) - new Date(transaction1.created_at)
		);

		sortedTransactions.forEach((transaction) => {
			updatedCurrentBalance(transaction);
			addToCalculatedBalance(transaction);
		});
	};
	const updatedCurrentBalance = (transaction) => {
		if (transaction.sender_id === $accounts[0].id) {
			currentBalance += transaction.amount;
		} else if (transaction.reciver_id === $accounts[0].id) {
			currentBalance -= transaction.amount;
		}
	};

	onMount(() => {
		calculateBalance();
		document.body.style.zoom = ZOOM_LEVEL;
	});
</script>

<Line id="chart" data={chartData} options={chartOptions} />
