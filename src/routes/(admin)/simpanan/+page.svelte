<script>
	import { Button, Heading } from 'flowbite-svelte';
	import { WalletOutline, CashOutline } from 'flowbite-svelte-icons';
	import HeaderPage from '../../../lib/components/layout/HeaderPage.svelte';
	import UiTable from '../../../lib/components/ui/UiTable.svelte';
	import UiLoadMemuat from '../../../lib/components/ui/UiLoadMemuat.svelte';

	export let data;
</script>

<HeaderPage title="Simpanan" icon={CashOutline} breadcrumb={[['Simpanan']]} />

<Button href="/simpanan/input" class="mb-8">
	<WalletOutline class="w-5 h-5 me-2" />
	Input Baru
</Button>

<section class="mb-8">
	<Heading tag="h4" class="mb-4">Simpanan Pokok</Heading>

	{#await data?.simpanan_pokok}
		<UiLoadMemuat />
	{:then values}
		<UiTable
			rows={values}
			props={[
				{ label: 'No Anggota', name: 'anggota_no_anggota' },
				{ label: 'Nama', name: 'anggota_nama_lengkap' },
				{ label: 'Tanggal', name: 'tanggal', type: 'date' },
				{ label: 'Nilai', name: 'nilai', type: 'number' },
				{ label: 'Dibuat', name: 'created_at', type: 'datetime' }
			]}
		/>
	{/await}
</section>

<section class="mb-8">
	<Heading tag="h4" class="mb-4">Simpanan Wajib</Heading>
	{#await data?.simpanan_wajib}
		<UiLoadMemuat />
	{:then values}
		<UiTable
			rows={values}
			props={[
				{ label: 'No Anggota', name: 'anggota_no_anggota' },
				{ label: 'Nama', name: 'anggota_nama_lengkap' },
				{ label: 'Tanggal', name: 'tanggal', type: 'date' },
				{ label: 'Tahun', name: 'tahun' },
				{ label: 'Bulan', name: 'bulan' },
				{ label: 'Nilai', name: 'nilai', type: 'number' },
				{ label: 'Dibuat', name: 'created_at', type: 'datetime' }
			]}
		/>
	{/await}
</section>

<section class="mb-8">
	<Heading tag="h4" class="mb-4">Simpanan Tabungan</Heading>
	{#await data?.simpanan_tabungan}
		<UiLoadMemuat />
	{:then values}
		<UiTable
			rows={values}
			props={[
				{ label: 'No Anggota', name: 'anggota_no_anggota' },
				{ label: 'Nama', name: 'anggota_nama_lengkap' },
				{ label: 'Tanggal', name: 'tanggal', type: 'date' },
				{ label: 'Masuk', name: 'masuk', type: 'number' },
				{ label: 'Keluar', name: 'keluar', type: 'number' },
				{ label: 'Dibuat', name: 'created_at', type: 'datetime' }
			]}
		/>
	{/await}
</section>
