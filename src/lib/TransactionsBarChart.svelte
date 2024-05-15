<script>
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';

	export let transactions;

	const data = {
		labels: ['Eingang', 'Ausgang'],
		datasets: [
			{
				label: 'Einnahmen und Ausgaben',
				data: transactions.map((transaction) => transaction.amount),
				backgroundColor: ['rgba(159, 226, 191, 0.8)', 'rgba(222, 49, 99, 0.8)'],
				borderColor: ['rgb(159, 226, 191)', 'rgb(222, 49, 99)'],
				borderWidth: 1
			}
		]
	};
</script>

<Bar {data} />
