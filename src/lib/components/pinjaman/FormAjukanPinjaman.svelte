<script>
	import { Button, Card, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import { dateNowInput } from '$lib/utils';
	import ModalGetAnggota from '../anggota/ModalGetAnggota.svelte';
	import { numberToRupiah } from '$lib/utils/use';
	import UiForm from '../ui/UiForm.svelte';
	import UiCustomInputNumber from '../ui/UiCustomInputNumber.svelte';

	let values = {
		bulan: 10,
		angsuran: 0,
		nilai: undefined,
		bunga: 0
	};

	$: if (values.nilai) {
		const prosen_bunga = 1.5 / 100;
		const bunga = values.nilai * prosen_bunga;
		values.angsuran = values.nilai / values.bulan + bunga;
		values.bunga = values.angsuran * values.bulan - values.nilai;
		values.angsuran = numberToRupiah(values.angsuran);
	}

	let isOpenModalGetAnggota = false;
	let anggota = {};

	let classInputNumber =
		'block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-gray-300 dark:border-gray-500 text-sm rounded-lg mt-2';
</script>

<Card size="xl" class="shadow-none">
	<Heading tag="h4" class="mb-4">Form Pengajuan Pinjaman</Heading>
	<hr class="mb-8 -mx-6" />

	<UiForm
		class="grid gap-4"
		name="Pengajuan Pinjaman"
		action="/pinjaman?/ajukan"
		isShowLoad
		successTitle="Berhasil pengajuan Pinjaman !"
		successText="Nama anggota : {anggota?.nama_lengkap}"
		defaultValueForm={['tanggal']}
	>
		<input type="hidden" name="table" value="pinjaman" />
		<input type="hidden" name="anggota_id" value={anggota?.id} />

		<Label>
			<span>Anggota</span>
			<Input
				type="text"
				name="nama"
				value={anggota?.nama_lengkap ?? ''}
				class="mt-2 read-only:opacity-75"
				placeholder="Pilih Anggota"
				required
				autocomplete="off"
				on:click={() => (isOpenModalGetAnggota = true)}
			/>
		</Label>

		<Label>
			<span>Tanggal</span>
			<Input type="date" name="tanggal" class="mt-2" value={dateNowInput()} required />
		</Label>

		<Label>
			<span>Nilai</span>
			<UiCustomInputNumber name="nilai" class="mt-2" required bind:value={values.nilai} />
		</Label>

		<Label>
			<span>Bulan</span>
			<Input type="number" name="bulan" class="mt-2" required bind:value={values.bulan} />
		</Label>

		<Label>
			<span>Angsuran</span>
			<Input type="text" name="angsuran" class="mt-2" readonly bind:value={values.angsuran} />
		</Label>

		<input type="number" name="bunga" bind:value={values.bunga} hidden />

		<Label>
			<span>Tanggal Jatuh Tempo</span>
			<Input type="number" name="jatuh_tempo" class="mt-2" value="10" required />
		</Label>

		<Label>
			<span>Keterangan</span>
			<Textarea name="keterangan" class="mt-2" placeholder="..." />
		</Label>

		<footer class="text-center">
			<Button color="yellow" outline type="reset">Kosongkan</Button>
			<Button type="submit">Simpan</Button>
		</footer>
	</UiForm>
</Card>

<ModalGetAnggota bind:isOpen={isOpenModalGetAnggota} callback={(val) => (anggota = val)} />
