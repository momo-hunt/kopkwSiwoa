<script>
	import { Modal, Search } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	export let isOpen = false,
		callback = () => {};
	let promise = getContext('promise_anggota');

	let search = '';

	$: filterLists = (lists) => {
		return lists.filter((v) => {
			return v.no_anggota?.includes(search) || v.nama_lengkap?.includes(search);
		});
	};

	function handleChoose(val) {
		callback(val);
		isOpen = false;
	}
</script>

<Modal title="Pilih Anggota" bind:open={isOpen} size="md" padding="xs">
	{#await promise}
		<p>Memuat..</p>
	{:then lists}
		<Search bind:value={search} />

		<ul class="my-4 space-y-4">
			<li>
				{#each filterLists(lists) as v}
					<a
						href="/{v?.nama_lengkap ?? ''}"
						class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
						on:click|preventDefault={() => handleChoose(v)}
					>
						<span class="flex-1 ms-3 whitespace-nowrap">{v?.no_anggota} - {v?.nama_lengkap}</span>
					</a>
				{:else}
					<p class="text-center">Anggota tidak ditemukan</p>
				{/each}
			</li>
		</ul>
	{/await}
</Modal>
