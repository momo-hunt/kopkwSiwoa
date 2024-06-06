<script>
	import { WalletOutline } from 'flowbite-svelte-icons';
	import HeaderPage from '../../../lib/components/layout/HeaderPage.svelte';
	import { Button } from 'flowbite-svelte';
	import UiTable from '../../../lib/components/ui/UiTable.svelte';

	export let data;

	let props = [
		{ label: 'No Anggota', name: 'no_anggota' },
		{ label: 'Nama', name: 'nama_lengkap' },
		{ label: 'Tanggal', name: 'tanggal', type: 'date' },
		{ label: 'Nilai', name: 'nilai', type: 'number' },
		{ label: 'Lunas', name: 'is_lunas', type: 'boolean' },
		{ label: 'Angsuran', name: 'angsuran', type: 'number' },
		{ label: 'Dibuat', name: 'created_at', type: 'datetime' }
	];
</script>

<HeaderPage title="Pinjaman" icon={WalletOutline} breadcrumb={[['Pinjaman']]} />

<Button href="/pinjaman/ajukan" class="mb-8">
	<WalletOutline class="w-5 h-5 me-2" />
	Ajukan Pinjaman
</Button>

{#await data.pinjaman}
	<p>Memuat..</p>
{:then rows}
	<UiTable {rows} {props} />
{/await}
