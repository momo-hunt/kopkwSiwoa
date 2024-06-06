<script>
	import { Navbar, Button, NavHamburger, Heading, NavBrand } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { assets } from '$app/paths';
	import { UserCircleSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import Swal from 'sweetalert2';

	$: userName = $page?.data?.session?.user?.user_metadata?.name;

	$: logout = async () => {
		Swal.fire({
			title: 'Loading..',
			didOpen() {
				Swal.showLoading();
			}
		});
		await $page?.data?.supabase.auth.signOut();
		Swal.fire('Berhasil logout', '', 'success');
	};

	const drawer = getContext('drawer');
</script>

<Navbar>
	<NavBrand href="/">
		<img src="{assets}/koperasi_indonesia-logo.png" alt="logo-koperasi" class="me-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Koperasi Wanita Anggrek
		</span>
	</NavBrand>
	<div class="flex items-center gap-4">
		<span class="font-bold">
			<UserCircleSolid size="lg" class="inline-block mb-1" />
			{userName ?? ''}
		</span>
		<Button outline color="red" size="sm" on:click={logout}>Logout</Button>
		<NavHamburger onClick={() => ($drawer.hidden = false)} />
	</div>
</Navbar>
