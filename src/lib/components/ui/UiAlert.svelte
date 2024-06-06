<script>
	import { Alert } from 'flowbite-svelte';
	import { ExclamationCircleOutline, CheckCircleOutline } from 'flowbite-svelte-icons';
	import { alert } from '$lib/stores';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		alert.reset();
	});
</script>

{#if $alert?.text}
	<Alert color={$alert?.type == 'success' ? 'green' : 'red'} dismissable>
		<svelte:component
			this={$alert?.type == 'success' ? CheckCircleOutline : ExclamationCircleOutline}
			slot="icon"
			class="w-5 h-5"
		/>

		{$alert?.text ?? 'Test alert'}

		{#if $alert?.link}
			<a
				href={$alert?.link}
				class="font-semibold underline hover:text-blue-800 dark:hover:text-blue-900"
			>
				Lihat
			</a>
		{/if}
	</Alert>
{/if}
