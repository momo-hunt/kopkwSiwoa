<script>
	import { Spinner } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
</script>

<div transition:fly={{ y: -20 }} class="text-center">
	<Spinner size="6" class="mr-2" />
	<span>Memuat...</span>
</div>
