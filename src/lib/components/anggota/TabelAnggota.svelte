<script>
	import { getContext } from 'svelte';
	import UiTable from '../ui/UiTable.svelte';
	import { Card, Heading } from 'flowbite-svelte';
	import TablePagenation from './table/TablePagenation.svelte';
	import TableSearch from './table/TableSearch.svelte';

	export let rows;
	let filter;
	const drawAnggota = getContext('draw-anggota');

	let props = [
		{ label: 'No', name: 'no_anggota' },
		{ label: 'Nama', name: 'nama_lengkap' },
		{ label: 'Simpanan', name: 'total_simpanan', type: 'number' },
		{ label: 'Pinjaman', name: 'total_pinjaman', type: 'number' },
		{ label: 'Dibuat', name: 'created_at', type: 'datetime' },
		{
			label: '',
			name: 'aksi',
			links: [
				{
					label: 'Lihat',
					callback: (anggota) => {
						console.log('lihat anggota', anggota);
						drawAnggota.set({ anggota, hidden: false });
					}
				}
			]
		}
	];
</script>

<Card size="xl" class="space-y-4">
	<header>
		<Heading tag="h5">Daftar Anggota</Heading>
	</header>
	<div>
		<TableSearch bind:filter />
	</div>

	<UiTable {rows} {props} {filter} />

	<footer class="flex justify-between">
		<div class="text-sm">Menampilkan 1 - 5 dari {rows?.length} baris</div>

		<TablePagenation />
	</footer>
</Card>
