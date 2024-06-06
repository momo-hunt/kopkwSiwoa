<script>
	import { ArrowDownOutline, ArrowUpOutline, DotsHorizontalOutline } from 'flowbite-svelte-icons';
	import { numberToRibuan } from '$lib/utils/use';
	import { getFormatDateTimeIndo, getFormatDateIndo } from '$lib/utils';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	export let rows = [],
		props = [],
		filter = undefined;

	$: sortBy = $page?.url?.searchParams.get('sortBy');
	$: asc = $page?.url?.searchParams.has('asc');
	$: baseUrl = $page?.url?.origin + $page?.url?.pathname;

	function textRight(type) {
		const incl = ['rupiah', 'number'];
		return incl.indexOf(type) >= 0;
	}

	function getValue(row, name, type) {
		if (type == 'date') {
			return getFormatDateIndo(row?.[name]);
		}
		if (type == 'datetime') {
			return getFormatDateTimeIndo(row?.[name]);
		}
		if (type == 'number') {
			return numberToRibuan(row?.[name]);
		}

		return row?.[name];
	}

	$: setHref = (name) => {
		let fasc = '';
		if (!asc) {
			fasc = '&asc';
		} else if (name != sortBy) {
			fasc = '&asc';
		} else {
			fasc = '';
		}
		return baseUrl + '?sortBy=' + name + fasc;
	};

	$: rowsData = () => {
		if (sortBy) {
			console.log('sorted');
			rows.sort((a, b) => {
				if (Number(a[sortBy])) return asc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];

				let da = new Date(a[sortBy]),
					db = new Date(b[sortBy]);

				if (da != 'Invalid Date') {
					return asc ? da - db : db - da;
				}

				let fa = a[sortBy].toLowerCase(),
					fb = b[sortBy].toLowerCase();

				let val = fa > fb ? 1 : fa < fb ? -1 : 0;
				return asc ? val * -1 : val;
			});
		}

		return filter ? filterData(rows) : rows;
	};

	const filterData = (rows) => {
		console.log('filter', filter);
		rows = rows.filter((r) => {
			const index = filter?.findIndex((f) =>
				r?.[f?.by]?.toLowerCase()?.includes(f?.value?.toLowerCase())
			);
			return index >= 0;
		});
		return rows;
	};
</script>

<div transition:fly={{ y: -20 }}>
	<Table hoverable>
		<TableHead class="text-gray-400">
			{#each props as { label, type, name }}
				<TableHeadCell class={textRight(type) && 'text-right'}>
					<a href={setHref(name)} class="inline-flex items-center gap-2 w-full">
						{label}
						{#if sortBy && sortBy == name}
							{#if asc}
								<ArrowDownOutline size="sm" />
							{:else}
								<ArrowUpOutline size="sm" />
							{/if}
						{/if}
					</a>
				</TableHeadCell>
			{/each}
		</TableHead>

		<TableBody tableBodyClass="divide-y">
			{#each rowsData() as row}
				<TableBodyRow>
					{#each props as { name, type, links }}
						{#if !links}
							<TableBodyCell class={textRight(type) && 'text-right'}>
								{getValue(row, name, type) ?? ''}
							</TableBodyCell>
						{/if}

						{#if name == 'menu'}
							<TableBodyCell>
								<Button class="border-0 py-1" color="alternative" size="xs">
									<DotsHorizontalOutline />
								</Button>
							</TableBodyCell>
						{/if}

						{#if name == 'aksi'}
							<TableBodyCell>
								{#each links as { label, callback }}
									<a
										href="/{row?.nama_lengkap}"
										type="button"
										class="inline-flex items-center text-primary-600 hover:underline"
										on:click|preventDefault={() => callback && callback(row)}>{label}</a
									>
								{/each}
							</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
