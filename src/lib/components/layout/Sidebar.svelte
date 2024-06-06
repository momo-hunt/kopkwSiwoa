<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Heading, Hr } from 'flowbite-svelte';
	import { HomeOutline, UsersGroupOutline, CashOutline } from 'flowbite-svelte-icons';
	import { getContext } from 'svelte';

	const drawer = getContext('drawer');

	$: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
	<header class="text-center">
		<Heading tag="h3" class="">Admin <br /><span class="text-2xl">Dashboard</span></Heading>
	</header>

	<Hr />

	<h5
		id="drawer-navigation-label-3"
		class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
	>
		Menu
	</h5>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="Dashboard" href="/" on:click={() => ($drawer.hidden = true)}>
				<svelte:fragment slot="icon">
					<HomeOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>

			<SidebarItem label="Anggota" href="/anggota" on:click={() => ($drawer.hidden = true)}>
				<svelte:fragment slot="icon">
					<UsersGroupOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>

			<SidebarItem label="Simpanan" href="/simpanan" on:click={() => ($drawer.hidden = true)}>
				<svelte:fragment slot="icon">
					<CashOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>

			<SidebarItem label="Pinjaman" href="/pinjaman" on:click={() => ($drawer.hidden = true)}>
				<svelte:fragment slot="icon">
					<CashOutline
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
