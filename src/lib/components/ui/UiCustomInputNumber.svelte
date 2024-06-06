<script>
	import { customInputNumber } from '$lib/utils/use';

	export let value = '',
		name,
		required = undefined;

	let clazz = '';
	export { clazz as class };

	let classInputNumber =
		'block w-full border disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-500 text-sm rounded-lg';
</script>

<input
	class="{classInputNumber} {clazz}"
	{name}
	id={name}
	use:customInputNumber
	{required}
	placeholder="0"
	bind:value
/>
