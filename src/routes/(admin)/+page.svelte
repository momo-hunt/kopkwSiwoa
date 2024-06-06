<script>
	import HeaderPage from '../../lib/components/layout/HeaderPage.svelte';
	import Widget from '../../lib/components/beranda/Widget.svelte';
</script>

<HeaderPage title="Beranda" />

<div class="grid grid-cols-3 gap-8">
	<Widget title="Anggota" value="200" />
	<Widget title="Simpanan" value="200" />
	<Widget title="Pinjaman" value="200" />
</div>
