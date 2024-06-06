<script>
	import { Card, Heading, P } from 'flowbite-svelte';

	export let title, value;
</script>

<Card>
	<Heading tag="h2">{value}</Heading>
	<P class="text-gray-600">{title}</P>
</Card>
