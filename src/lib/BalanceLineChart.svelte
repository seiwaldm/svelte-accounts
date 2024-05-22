<script>
    import { Line } from 'svelte-chartjs';
    import 'chart.js/auto';
    import 'chartjs-adapter-date-fns';
	import { Chart } from 'chart.js/dist';
   //import { onMount } from 'svelte';
    import { Database } from 'lucide-svelte';

    export let transactions;
    
	$: sortedTransactions = [...transactions].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    
	let dates = transactions.map(transaction => new Date(transaction.created_at).getTime());
    let minDate = new Date(Math.min(...dates));
    let maxDate = new Date(Math.max(...dates));

    let chart;
    let ctx;


    let days = transactions
        .map((transaction) => transaction.created_at)
        .map((date) =>
            new Date(date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        );
    let data = {
        labels: days,
        datasets: [
            {
                label: 'My balance',
                data: [65, 59, 80, 81],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };
	

	// $: days = transactions
    //     .map((transaction) => transaction.created_at)
    //     .map((date) =>
    //         new Date(date).toLocaleDateString('de-DE', {
    //             year: 'numeric',
    //             month: 'short',
    //             day: 'numeric'
    //         })
    //     );
 
    // const data = {
    //     labels: days, //Datum
    //     datasets: [
    //         {
    //             label: 'My balance',
    //             data: [65, 59, 80, 81], //Balnace
    //             fill: false,
    //             borderColor: 'rgb(75, 192, 192)',
    //             tension: 0.1
    //         }
    //     ]
    // };

	onMount(() => {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data: [{
                        x: minDate,
                        y: 0
                    }, {
                        x: maxDate,
                        y: 0
                    }]
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }
                }
            }
        });
    });

	const complex = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(205, 130,1 58)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: 'My Second dataset',
				fill: true,
				lineTension: 0.3,
				backgroundColor: 'rgba(184, 185, 210, .3)',
				borderColor: 'rgb(35, 26, 136)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(35, 26, 136)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};
</script>

<canvas bind:this={ctx}></canvas>
<Line {data} />
{days}