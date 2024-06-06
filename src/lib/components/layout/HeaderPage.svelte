<script>
	import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
	import { HomeOutline } from 'flowbite-svelte-icons';

	let spanClass = 'ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400';

	export let title = undefined,
		icon = HomeOutline,
		breadcrumb = [];
</script>

<header class="block md:flex mb-8 justify-between items-end">
	<Heading tag="h2" class="font-bold flex items-center">
		<svelte:component this={icon} size="xl" class="mr-2" />
		{title}
	</Heading>

	<Breadcrumb>
		<BreadcrumbItem href="/" home>Beranda</BreadcrumbItem>
		{#each breadcrumb as bread}
			<BreadcrumbItem spanClass="text-nowrap {spanClass}" href={bread?.[1] ?? undefined}
				>{bread?.[0] ?? ''}</BreadcrumbItem
			>
		{/each}
	</Breadcrumb>
</header>
