<script lang="ts" context="module">
	export interface ColumnTable<T> {
		header: string;
		accessor: keyof T;
		sortable?: boolean;
		filterable?: boolean;
		width?: number | undefined;
	}
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store';
	export type T = $$Generic;
	export let columns: ColumnTable<T>[];
	export let dataTable: Writable<T[]>;
	export let loading: boolean;
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addResizedColumns,
		addSelectedRows,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import TableCheckbox from './TableCheckbox.svelte';
	import ChevronDown from '../../icons/ChevronDown.svelte';
	import ChveronUp from '../../icons/ChveronUp.svelte';
	import { createEventDispatcher } from 'svelte';
	import TableActions, { type CustomEventProps } from './TableActions.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { type ModalSettings, modalStore } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	const dispatch = createEventDispatcher();

	const table = createTable(dataTable, {
		page: addPagination({ initialPageSize: 5 }),
		sort: addSortBy(),
		resize: addResizedColumns(),
		select: addSelectedRows(),
		filter: addTableFilter()
	});

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, visibleColumns } =
		table.createViewModel(columnsGenerator());
	const { pageSize, hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
	const { somePageRowsSelected, allPageRowsSelected, allRowsSelected } = pluginStates.select;
	const { filterValue } = pluginStates.filter;
	let pageSizes = [5, 10, 15, 25, 50, 100].map((item) => ({ id: item, value: item }));
	function columnsGenerator() {
		const arrColumns = columns.map((col) => {
			return table.column({
				header: col.header,
				accessor: col.accessor,
				plugins: {
					sort: {
						disable: typeof col?.sortable == 'boolean' ? !col?.sortable : false
					},
					resize: {
						initialWidth: col.width
					},
					filter: {
						exclude: typeof col?.filterable == 'boolean' ? !col?.filterable : false
					}
				}
			});
		});
		return table.createColumns([
			table.display({
				id: 'selected',
				header: '',
				cell: ({ row }, { pluginStates }) => {
					const { isSomeSubRowsSelected, isSelected } = pluginStates.select.getRowState(row);
					return createRender(TableCheckbox, {
						isSelected,
						isSomeSubRowsSelected
					});
				},
				plugins: {
					resize: {
						initialWidth: 50
					}
				}
			}),
			...arrColumns,
			table.display({
				id: 'actions',
				header: '',
				cell: ({ row }, { pluginStates: _pluginStates }) => {
					return createRender(TableActions<T>, {
						row
					});
				},
				plugins: {
					resize: {
						initialWidth: 70
					}
				}
			})
		]);
	}
	const handleEdit = ({ detail }: CustomEvent<CustomEventProps>) => {
		const props: CustomEventProps = { id: detail.id };
		dispatch('edit', props);
	};
	const confirmDelete = ({ detail }: CustomEvent<CustomEventProps>) => {
		const d: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure delete this data?',
			response(r: boolean) {
				if (r) {
					const props: CustomEventProps = { id: detail.id };
					dispatch('delete', props);
				}
			}
		};
		if (browser) modalStore.trigger(d);
	};
</script>

<div
	class="table-container space-y-6 bg-surface-100-800-token p-6 border border-surface-300-600-token mx-auto {$$props.class ??
		''}"
>
	<div
		class="flex items-center justify-end"
		class:justify-between={$somePageRowsSelected}
		class:bg-primary={$somePageRowsSelected}
	>
		{#if $somePageRowsSelected}
			<div>
				<label class="label cursor-pointer">
					<span class="label-text mr-4 text-xs font-semibold text-white">Select All</span>
					<input type="checkbox" class="toggle toggle-xs" bind:checked={$allRowsSelected} />
				</label>
			</div>
		{/if}
		<div class="max-w-[15rem] w-full">
			<div class="input-group relative input-group-sm focus:outline">
				<input type="text" placeholder="Search…" bind:value={$filterValue} class="form-input" />
				<button class="absolute right-0">
					<SearchIcon class="w-4 h-4" />
				</button>
			</div>
		</div>
	</div>
	<table class="w-full table table-hover table-cell-fit " {...$tableAttrs}>
		<!-- head -->
		<thead>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							{#if cell.id === 'selected'}
								<th>
									<TableCheckbox
										isSelected={allPageRowsSelected}
										isSomeSubRowsSelected={pluginStates.select.someRowsSelected}
									/>
								</th>
							{:else}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<th use:props.resize {...attrs} on:click={props.sort.toggle}>
										<div class="resizer" use:props.resize.drag />
										<Render of={cell.render()} />
										{#if props.sort.order === 'asc'}
											<ChevronDown class="w-4 h-4 inline" />
										{:else if props.sort.order === 'desc'}
											<ChveronUp class="w-4 h-4 inline" />
										{/if}
									</th>
								</Subscribe>
							{/if}
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#if loading}
				<tr>
					<td>Loading...</td>
				</tr>
			{:else}
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs rowProps={row.props()} let:rowProps>
						<tr {...rowAttrs} class:selected={rowProps.select.selected}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<td {...attrs} class:pl-4={cell.id === 'selected'}>
										{#if cell.id === 'actions'}
											<TableActions {row} on:edit={handleEdit} on:delete={confirmDelete} />
										{:else}
											<p class="line-clamp-2">
												<Render of={cell.render()} />
											</p>
										{/if}
									</td>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{:else}
					<tr>
						<td colspan={$visibleColumns.length} class="text-center py-6 my-11">
							<p>
								{#if $filterValue}
									No data found with keyword : {$filterValue}
								{:else}
									No data found
								{/if}
							</p>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
		<tfoot>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
					<tr {...rowAttrs} class="bg-surface-200-700-token">
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<th {...attrs} class="text-left px-2 py-2">
									<Render of={cell.render()} />
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</tfoot>
	</table>
	<div
		class="flex flex-row justify-between px-3 py-3 items-center bg-surface-200-700-token border border-surface-300-600-token rounded-container-token"
	>
		<div>
			<select
				name="pageSize"
				class="select select-sm text-gray-500"
				id="pageSize"
				bind:value={$pageSize}
			>
				{#each pageSizes as size, id}
					<option value={size.id}>{size.value}</option>
				{/each}
			</select>
		</div>
		<div class="text-sm text-gray-500 text-semibold">
			{$pageIndex + 1} of {$pageCount} Pages
		</div>
		<nav class="isolate inline-flex space-x-2 rounded-md shadow-sm" aria-label="Pagination">
			<button on:click={() => $pageIndex--} disabled={$hasNextPage} class="btn-icon variant-filled">
				<span class="sr-only">Previous</span>
				←
			</button>
			<button
				on:click={() => $pageIndex++}
				disabled={$hasPreviousPage}
				class="btn-icon variant-filled"
			>
				<span class="sr-only">Next</span>
				→
			</button>
		</nav>
	</div>
</div>

<!-- NOTE: global attribute if you want to apply token dark: and light: mode -->
<style lang="postcss" global>
	th {
		position: relative;
	}
	table {
		border-collapse: separate;
		border-spacing: 0;
	}
	table th {
		@apply border-l border-y border-surface-300-600-token;
	}
	table td:first-child {
		@apply border-l border-surface-300-600-token;
	}
	table td:last-child {
		@apply border-r border-surface-300-600-token;
	}
	thead tr:first-child th:first-child {
		@apply rounded-tl-container-token;
	}
	thead tr:first-child th:last-child {
		@apply rounded-tr-container-token;
	}
	tfoot tr:last-child th:first-child {
		@apply rounded-bl-container-token;
	}
	tfoot tr:last-child th:last-child {
		@apply rounded-br-container-token;
	}
	.resizer {
		position: absolute;
		top: 0;
		bottom: 0;
		right: -1px;
		width: 1px;
		@apply bg-surface-300-600-token;
		cursor: col-resize;
		z-index: 1;
		-webkit-transition: width 0.2s ease-in-out;
		-moz-transition: width 0.2s ease-in-out;
		-o-transition: width 0.2s ease-in-out;
		transition: width 0.2s ease-in-out;
	}
	.resizer:hover {
		width: 6px;
		@apply bg-primary-hover-token;
	}
	.selected {
		@apply bg-primary-900/20;
	}
</style>
