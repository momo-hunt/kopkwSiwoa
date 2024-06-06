<script>
	import { goto, invalidate } from '$app/navigation';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Navbar from '../../lib/components/layout/Navbar.svelte';
	import Drawer from '../../lib/components/layout/Drawer.svelte';

	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	const drawer = writable({ hidden: true });

	setContext('drawer', drawer);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}

			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="flex w-full">
	<Drawer />
	<div class="flex-none hidden md:block p-4 bg-white h-screen overflow-y-auto sticky top-0">
		<Sidebar />
	</div>
	<div class="flex-1">
		<Navbar />
		<div class="m-8">
			<slot />
		</div>
	</div>
</div>
