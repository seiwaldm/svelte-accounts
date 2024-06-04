<script>
	import { accounts, accountList} from '$lib/store.js';
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';

	export let transactions;

	const income = transactions.reduce((total, transaction) => {
		if (transaction.receiver_id === $accounts[0].id) {
			return total + transaction.amount;
		} else {
			return total;
		}
	}, 0);

	const expenses = transactions.reduce((total, transaction) => {
		if (transaction.sender_id === $accounts[0].id) {
			return total + transaction.amount;
		} else {
			return total;
		}
	}, 0);

	const data = {
		labels: ['Cash Flow'],
		datasets: [
			{
				label: 'Einnahmen',
				data: [income],
				backgroundColor: ['rgba(58, 238, 106, 0.4)'], // Blau
				borderColor: ['rgba(58, 238, 106, 0.7)'],
				borderWidth: 2
			},
			{
				label: 'Ausgaben',
				data: [expenses],
				font: {
					size: 18
				},
				backgroundColor: ['rgba(238, 28, 28,0.4)'], // Pink
				borderColor: ['rgba(238, 28, 28, 0.7)'],
				borderWidth: 2
			}
		]
	};
</script>

<Bar {data} />
