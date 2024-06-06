<script>
	import { CloseButton, Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import Sidebar from './Sidebar.svelte';
	import { getContext } from 'svelte';

	const drawer = getContext('drawer');

	//   let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={$drawer.hidden} id="sidebar2">
	<div class="text-right">
		<CloseButton on:click={() => ($drawer.hidden = true)} class="mb-4 dark:text-white" />
	</div>

	<Sidebar />
</Drawer>
