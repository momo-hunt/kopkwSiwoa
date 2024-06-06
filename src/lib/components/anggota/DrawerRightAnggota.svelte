<script>
	import { Drawer, Button, CloseButton, Avatar, Heading, Hr, P } from 'flowbite-svelte';
	import { InfoCircleSolid, ArrowRightOutline, UserCircleSolid } from 'flowbite-svelte-icons';
	import { getContext } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import { numberToRupiah } from '$lib/utils/use';

	const drawAnggota = getContext('draw-anggota');
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	};

	let hidd = false;
</script>

<Drawer
	placement="right"
	transitionType="fly"
	transitionParams={transitionParamsRight}
	bind:hidden={$drawAnggota.hidden}
	id="sidebar-anggota"
	class="overflow-y-auto"
>
	<div class="flex items-center">
		<h5
			id="drawer-label"
			class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
		>
			<InfoCircleSolid class="w-5 h-5 me-2.5" />Detail Anggota
		</h5>
		<CloseButton on:click={() => ($drawAnggota.hidden = true)} class="mb-4 dark:text-white" />
	</div>

	<div class="flex flex-col items-center">
		<Avatar size="lg" />
		<Heading class="w-fit" tag="h2">{$drawAnggota?.anggota?.nama_lengkap ?? null}</Heading>
		<Heading class="w-fit text-gray-400" tag="h5"
			>{$drawAnggota?.anggota?.no_anggota ?? null}
			{$drawAnggota?.anggota?.jenis_kelamin?.toLowerCase() == 'perempuan' ? '(P)' : '(L)'}
		</Heading>
	</div>

	<section class="border p-4 mt-8 shadow-sm divide-y">
		<Heading tag="h5" class="text-gray-500 leading-7 mb-2">Detail</Heading>

		{#each [{ label: 'NIK KTP', name: 'nik' }, { label: 'No KK', name: 'kk' }, { label: 'Tempat, Tanggal Lahir', name: 'tempat_lahir', name2: 'tanggal_lahir' }, { label: 'Pekerjaan', name: 'pekerjaan' }, { label: 'Alamat', name: 'alamat' }] as { label, name, name2 }}
			<div class="mx-4">
				<div class="text-gray-500 text-sm leading-6">{label}</div>

				<div class="font-semibold leading-7">
					{$drawAnggota?.anggota?.[name] ?? ''}
					{#if name2}
						, {$drawAnggota?.anggota?.[name] ?? ''}
					{/if}
				</div>
			</div>
		{/each}

		<footer class="pt-4 grid gap-2">
			<Button pill color="alternative">Ubah</Button>
			<Button pill color="red" outline>Non Aktifkan</Button>
		</footer>
	</section>

	<section class="border p-4 mt-8 shadow-sm divide-y">
		<Heading tag="h5" class="text-gray-500 leading-7 mb-2">Simpanan</Heading>

		{#each [{ label: 'Pokok', name: 'pokok' }, { label: 'Wajib', name: 'wajib' }, { label: 'Tabungan', name: 'tabungan' }] as { label, name }}
			<div class="mx-4">
				<div class="text-gray-500 text-sm leading-6">{label}</div>

				<div class="font-semibold text-right leading-7">
					{numberToRupiah($drawAnggota?.anggota?.['total_simpanan_' + name] ?? 0)}
				</div>
			</div>
		{/each}

		<footer class="pt-4 grid gap-2">
			<Button href="/simpanan/input?anggotaId={$drawAnggota?.anggota?.id}" pill color="primary"
				>Input Simpanan</Button
			>
		</footer>
	</section>

	<section class="mt-8 divide-y shadow-sm p-4 border">
		<Heading tag="h5" class="text-gray-500 leading-7 mb-2">Pinjaman</Heading>

		{#each [{ label: 'Belum lunas', name: 'total_pinjaman' }] as { label, name }}
			<div class="mx-4">
				<div class="text-gray-500 text-sm leading-6">{label}</div>

				<div class="font-semibold text-right leading-7">
					{numberToRupiah($drawAnggota?.anggota?.[name] ?? 0)}
				</div>
			</div>
		{/each}

		<footer class="pt-4 grid gap-2">
			<Button pill color="primary">Ajukan Pinjaman</Button>
			<Button pill color="blue">Input Angsuran</Button>
		</footer>
	</section>
</Drawer>
