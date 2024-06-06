<script>
	import { Button, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import { dateNowInput, defaultInput } from '$lib/utils';
	import UiForm from '../ui/UiForm.svelte';
	import UiCustomInputNumber from '../ui/UiCustomInputNumber.svelte';

	export let anggota = {},
		toggleModal;
</script>

<Heading tag="h4" class="mb-4">Input Simpanan Wajib</Heading>

<hr class="mb-8 -mx-4" />

<UiForm
	class="grid gap-4"
	name="Input Simpanan Wajib"
	action="/simpanan?/input"
	isShowLoad
	successTitle="Berhasil input Simpanan Wajib !"
	successText="Nama anggota : {anggota?.nama_lengkap}"
	defaultValueForm={['tanggal', 'tahun', 'bulan']}
>
	<input type="hidden" name="table" value="simpanan_wajib" />
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
			autocompleted="false"
			on:click={toggleModal}
		/>
	</Label>

	<Label>
		<span>Tanggal</span>
		<Input type="date" name="tanggal" id="tanggal" class="mt-2" value={dateNowInput()} required />
	</Label>

	<div class="grid grid-cols-2 gap-6">
		<Label>
			<span>Tahun</span>
			<Input
				type="number"
				name="tahun"
				id="tahun"
				class="mt-2"
				value={defaultInput().year}
				required
			/>
		</Label>

		<Label>
			<span>Bulan</span>
			<Input
				type="number"
				name="bulan"
				id="bulan"
				class="mt-2"
				value={defaultInput().month}
				required
			/>
		</Label>
	</div>

	<Label>
		<span>Nilai</span>
		<UiCustomInputNumber name="nilai" class="mt-2" required />
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
