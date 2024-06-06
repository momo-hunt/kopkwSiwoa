<script>
	import { UserAddOutline } from 'flowbite-svelte-icons';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import HeaderPage from '../../../../lib/components/layout/HeaderPage.svelte';
	import FormTambahAnggota from '../../../../lib/components/anggota/FormTambahAnggota.svelte';
	import ImportAnggota from '../../../../lib/components/anggota/ImportAnggota.svelte';
	import UiAlert from '../../../../lib/components/ui/UiAlert.svelte';
</script>

<HeaderPage
	title="Tambah Anggota"
	icon={UserAddOutline}
	breadcrumb={[['Anggota', '/anggota'], ['Tambah Anggota']]}
/>

<UiAlert />

<Tabs tabStyle="underline">
	<TabItem open>
		<div slot="title">Form Anggota</div>
		<FormTambahAnggota />
	</TabItem>
	<TabItem>
		<div slot="title">Import Anggota</div>
		<ImportAnggota />
	</TabItem>
</Tabs>
