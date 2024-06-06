<script>
	import { WalletOutline } from 'flowbite-svelte-icons';
	import { TabItem, Tabs } from 'flowbite-svelte';
	import HeaderPage from '../../../../lib/components/layout/HeaderPage.svelte';
	import InputSimpananPokok from '../../../../lib/components/simpanan/InputSimpananPokok.svelte';
	import InputSimpananWajib from '../../../../lib/components/simpanan/InputSimpananWajib.svelte';
	import InputSimpananTabungan from '../../../../lib/components/simpanan/InputSimpananTabungan.svelte';
	import UiAlert from '../../../../lib/components/ui/UiAlert.svelte';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import ModalGetAnggota from '../../../../lib/components/anggota/ModalGetAnggota.svelte';

	$: anggotaId = $page?.url?.searchParams.get('anggotaId');

	let anggota,
		isOpenModalGetAnggota = false;
	const toggleModal = () => (isOpenModalGetAnggota = !isOpenModalGetAnggota);

	const promise_anggota = getContext('promise_anggota');
	promise_anggota.then((val) => {
		anggota = val.filter((v) => v.id == anggotaId)[0];
	});
</script>

<HeaderPage
	title="Input Simpanan"
	icon={WalletOutline}
	breadcrumb={[['Simpanan', '/simpanan'], ['Input Simpanan']]}
/>

<UiAlert />

<Tabs tabStyle="underline">
	<TabItem open>
		<div slot="title">Simpanan Pokok</div>
		<InputSimpananPokok {anggota} {toggleModal} />
	</TabItem>
	<TabItem>
		<div slot="title">Simpanan Wajib</div>
		<InputSimpananWajib {anggota} {toggleModal} />
	</TabItem>
	<TabItem>
		<div slot="title">Simpanan Tabungan</div>
		<InputSimpananTabungan {anggota} {toggleModal} />
	</TabItem>
</Tabs>

<ModalGetAnggota bind:isOpen={isOpenModalGetAnggota} callback={(val) => (anggota = val)} />
