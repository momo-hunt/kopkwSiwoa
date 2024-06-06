<script>
	import { Button, Heading, Input, Label, Radio, Textarea } from 'flowbite-svelte';
	import Swal from 'sweetalert2';
	import { alert } from '$lib/stores';
	import UiForm from '../ui/UiForm.svelte';

	function handleSuccess() {
		Swal.fire('Berhasil !!!', 'Menambah anggota baru.', 'success');
		alert.success('Berhasil menambah anggota baru.', '/anggota/abbc');
	}
</script>

<UiForm name="Form Tambah Anggota" action="/anggota?/tambah" isShowLoad on:success={handleSuccess}>
	<Heading tag="h4" class="mb-4">Form Tambah Anggota</Heading>

	<div class="_grid">
		<Label>Tanggal Masuk</Label>
		<Input type="date" name="tanggal_masuk" required />
		<Label>No Anggota</Label>
		<Input name="no_anggota" placeholder="..." required />
		<Label>Nama Lengkap</Label>
		<Input name="nama_lengkap" placeholder="..." required />
		<Label>Jenis Kelamin</Label>
		<ul class="items-center flex gap-x-4">
			<li>
				<Radio name="jenis_kelamin" value="Laki-laki">Laki-laki</Radio>
			</li>
			<li>
				<Radio name="jenis_kelamin" value="Perempuan">Perempuan</Radio>
			</li>
		</ul>
		<Label>Tempat Lahir</Label>
		<Input name="tempat_lahir" placeholder="..." required />
		<Label>Tanggal Lahir</Label>
		<Input type="date" name="tanggal_lahir" required />
		<Label>NIK KTP</Label>
		<Input name="nik" type="number" placeholder="0000000000000000" required />
		<Label>No KK</Label>
		<Input name="kk" type="number" placeholder="0000000000000000" required />
		<Label>Pekerjaan</Label>
		<Input name="pekerjaan" placeholder="..." required />
		<Label>Alamat</Label>
		<Textarea name="alamat" placeholder="..." />
	</div>

	<footer class="mt-8 text-right">
		<Button type="reset" outline color="yellow">Kosongkan</Button>
		<Button type="submit">Tambah</Button>
	</footer>
</UiForm>

<style>
	._grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: max-content 1fr;
		align-items: center;
	}
</style>
