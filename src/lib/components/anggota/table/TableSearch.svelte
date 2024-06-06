<script>
	import { Search } from 'flowbite-svelte';
	export let filter;
	let value = '';

	function setFilter() {
		setTimeout(() => {
			filter = [
				{ by: 'no_anggota', value },
				{ by: 'nama_lengkap', value }
			];
		}, 1000);
	}
</script>

<Search
	size="md"
	placeholder="Cari No Anggota atau Nama Anggota"
	class="placeholder:italic max-w-[400px]"
	bind:value
	on:keyup={setFilter}
/>
