<script>
	import { Button, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import { dateNowInput } from '$lib/utils';
	import UiForm from '../ui/UiForm.svelte';
	import UiCustomInputNumber from '../ui/UiCustomInputNumber.svelte';

	export let anggota = {},
		toggleModal;
</script>

<Heading tag="h4" class="mb-4">Input Simpanan Pokok</Heading>

<hr class="mb-8 -mx-4" />

<UiForm
	class="grid gap-4"
	name="Input Simpanan Pokok"
	action="/simpanan?/input"
	isShowLoad
	successTitle="Berhasil input Simpanan Pokok !"
	successText="Nama anggota : {anggota?.nama_lengkap}"
	defaultValueForm={['tanggal']}
>
	<input type="hidden" name="table" value="simpanan_pokok" />
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
		<Input type="date" name="tanggal" class="mt-2" value={dateNowInput()} required />
	</Label>

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
