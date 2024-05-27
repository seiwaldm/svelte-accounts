<script>
	import { Line } from 'svelte-chartjs';
	import { transactions, accounts } from '$lib/store';
	import 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	//export let transactions;

	//Absteigende Sortierung!
	let sortedTransactions = $transactions.sort(
		(a, b) => new Date(b.created_at) - new Date(a.created_at)
	);
	let currentBalance = $accounts[0].balance;

	let calculatedBalance = [];

	let chartOptions = {
		scales: {
			x: {
				type: 'time'
			}
		}
	};

	onMount(() => {
		sortedTransactions.forEach((transaction) => {
			if (transaction.sender_id === $accounts[0].id) {
				console.log('sender');
				currentBalance += transaction.amount; //wir gehen von hinten nach vorne vor, also plus für Ausgaben
				calculatedBalance.push({
					x: transaction.created_at,
					y: currentBalance
				});
				calculatedBalance = calculatedBalance;
			} else if (transaction.receiver_id === $accounts[0].id) {
				currentBalance -= transaction.amount;
				calculatedBalance.push({
					x: transaction.created_at,
					y: currentBalance
				});
				calculatedBalance = calculatedBalance;
			}
		});
		chartData.datasets[0].data = calculatedBalance;
	});

	const chartData = {
		datasets: [
			{
				data: calculatedBalance
			}
		]
	};
</script>

<Line data={chartData} options={chartOptions} />
