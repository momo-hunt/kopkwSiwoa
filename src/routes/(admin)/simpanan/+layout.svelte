<script>
	import { setContext } from 'svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const getAnggota = async () => {
		console.log('load getAnggota()');
		const { data: anggota, error } = await supabase
			.from('anggota')
			.select('id,no_anggota,nama_lengkap');
		if (error) {
			console.log('Error:', error);
			return [];
		}
		return anggota;
	};
	let promise_anggota = getAnggota();
	setContext('promise_anggota', promise_anggota);
</script>

<slot />
