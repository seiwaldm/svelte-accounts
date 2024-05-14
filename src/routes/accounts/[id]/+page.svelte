<script>
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';

	const end = today(getLocalTimeZone());
	const start = end.subtract({ months: 1 });

	let value = {
		start,
		end
	};
</script>

<RangeCalendar bind:value class="rounded-md border max-w-min text-black bg-slate-300" />

{JSON.stringify(value)}
