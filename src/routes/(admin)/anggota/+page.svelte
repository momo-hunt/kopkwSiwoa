<script>
	import { Button } from 'flowbite-svelte';
	import { UserAddOutline, UsersGroupOutline } from 'flowbite-svelte-icons';
	import HeaderPage from '../../../lib/components/layout/HeaderPage.svelte';
	import TabelAnggota from '../../../lib/components/anggota/TabelAnggota.svelte';
	import UiLoadMemuat from '../../../lib/components/ui/UiLoadMemuat.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import DrawerRightAnggota from '../../../lib/components/anggota/DrawerRightAnggota.svelte';

	export let data;
	let anggota;

	data.anggota.then((val) => {
		anggota = val;
	});

	setContext('draw-anggota', writable({ hidden: true }));
</script>

<HeaderPage title="Anggota" icon={UsersGroupOutline} breadcrumb={[['Anggota']]} />

<Button href="/anggota/tambah" class="mb-8">
	<UserAddOutline class="w-5 h-5 me-2" />
	Tambah Baru
</Button>

{#if !anggota}
	<UiLoadMemuat />
{/if}

{#if anggota}
	<TabelAnggota rows={anggota} />
{/if}

<DrawerRightAnggota />
