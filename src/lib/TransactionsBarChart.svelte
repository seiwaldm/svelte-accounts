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

	const data1 = {
  labels: ['Einnahmen'],
  datasets: [
    {
      label: 'Einnahmen',
      data: [income],
      backgroundColor: ['#36A2EB'], // Blau
      borderColor: ['rgb(159, 226, 191)'],
      borderWidth: 2
    }]};

const data2 = {
	  labels: ['Ausgaben'],
	  datasets: [
    {
      label: 'Ausgaben',
      data: [expenses],
      backgroundColor: ['#FF6384'], // Pink
      borderColor: ['rgb(222, 49, 99)'],
      borderWidth: 2
    }
  ]
};
	// 	datasets: [
	// 		{
	// 			label: 'Einnahmen und Ausgaben',
	// 			data: [income, expenses],
	// 			backgroundColor: ['#36A2EB', '#FF6384'],
	// 			borderColor: ['rgb(159, 226, 191)', 'rgb(222, 49, 99)'],
	// 			borderWidth: 2
	// 		}
	// 	]
	// };
</script>
<Bar {data1} />
<!-- <Bar {data1||data2} /> -->
