<script>
	import { WalletOutline } from 'flowbite-svelte-icons';
	import HeaderPage from '../../../../lib/components/layout/HeaderPage.svelte';
	import FormAjukanPinjaman from '../../../../lib/components/pinjaman/FormAjukanPinjaman.svelte';
	import UiAlert from '../../../../lib/components/ui/UiAlert.svelte';
</script>

<HeaderPage
	title="Pengajuan Pinjaman"
	icon={WalletOutline}
	breadcrumb={[['Pinjaman', '/pinjaman'], ['Pengajuan']]}
/>

<UiAlert />

<FormAjukanPinjaman />
