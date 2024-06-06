<script>
	import { Input, Label, Heading, Button } from 'flowbite-svelte';
	import { UploadOutline, CloseOutline } from 'flowbite-svelte-icons';
	import { xlsx } from '$lib/utils';
	import Swal from 'sweetalert2';
	import UiForm from '../ui/UiForm.svelte';

	let files, arrJsonData;

	$: if (files) {
		console.log(files[0]);
		xlsx.read('anggota', files[0], (val) => (arrJsonData = JSON.stringify(val)));
	}

	let inputFileClass =
		'block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg border !p-0 dark:text-gray-400';

	function handleSuccess(e) {
		Swal.fire('Berhasil import anggota', '', 'success');
	}
</script>

<Heading tag="h4" class="mb-4">Import Data Anggota</Heading>

{#if !files}
	<Label class="space-y-2 mb-2">
		<span>Pilih berkas excel</span>
		<input
			type="file"
			name="file"
			bind:files
			class={inputFileClass}
			accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		/>
	</Label>
{/if}

{#if files}
	<Label>
		<div class="mb-2">Berkas import</div>
		<Input readonly name="file" value={files?.[0]?.name?.toUpperCase() ?? 'FILE.XLSX'} />
	</Label>

	<UiForm
		class="space-y-4"
		name="Import Anggota"
		action="/anggota?/import"
		on:success={handleSuccess}
		isShowLoad
	>
		<input type="hidden" name="arrJsonData" value={arrJsonData} />
		<footer class="text-center">
			<Button color="alternative" on:click={() => (files = undefined)}>
				<CloseOutline class="w-5 h-5 me-2" />
				Batal</Button
			>
			<Button type="submit">
				<UploadOutline class="w-5 h-5 me-2" />
				Import</Button
			>
		</footer>
	</UiForm>
{/if}
