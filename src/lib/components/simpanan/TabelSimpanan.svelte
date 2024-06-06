<script>
	import UiTable from '../ui/UiTable.svelte';

	export let rows = [],
		props = [
			{ label: 'No Anggota', name: 'anggota_no_anggota' },
			{ label: 'Nama', name: 'anggota_nama_lengkap' },
			{ label: 'Nilai', name: 'nilai' },
			{ label: 'Dibuat', name: 'created_at_id' }
		];

	// let props = [
	// 	{ label: 'No Anggota', name: 'no_anggota' },
	// 	{ label: 'Nama', name: 'nama_lengkap' },
	// 	{ label: 'Simpanan Pokok', name: 'total_simpanan_pokok' },
	// 	{ label: 'Simpanan Wajib', name: 'total_simpanan_wajib' },
	// 	{ label: 'Simpanan Tabungan', name: 'total_simpanan_tabungan' },
	// 	{ label: 'Total Simpanan', name: 'total_simpanan' }
	// ];
</script>

<UiTable {rows} {props} />
