<script lang="ts" context="module">
	export interface CustomEventProps {
		[key: string]: any;
		id: string | null;
	}
</script>

<script lang="ts">
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import DotVerticalIcon from '$lib/components/icons/DotVerticalIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import type { BodyRow } from 'svelte-headless-table';
	import { createEventDispatcher } from 'svelte';
	import { menu } from '@skeletonlabs/skeleton';
	export type T = $$Generic;
	export let componentId: string;
	export let row: BodyRow<T>;
	const dispatch = createEventDispatcher();
	const handleEditButton = () => {
		const props: CustomEventProps = { id: row.id };
		dispatch('edit', props);
	};
	const handleDeleteButton = () => {
		const props: CustomEventProps = { id: row.id };
		dispatch('delete', props);
	};
</script>

<div class="relative">
	<button
		class="btn btn-sm variant-ghost-primary"
		use:menu={{ menu: `table-actions-menu-${componentId}` }}
		><DotVerticalIcon class="w-4 h-4" />
	</button>
	<div class="card w-32 p-2" data-menu={`table-actions-menu-${componentId}`}>
		<ul class="p-2 !space-y-0">
			<li class="!p-0">
				<button
					on:click={handleEditButton}
					class="flex space-x-3 bg-primary-hover-token w-full p-2 rounded-full"
				>
					<span><EditIcon class="w-4 h-4" /></span>
					<span>Edit</span>
				</button>
			</li>
			<li class="!p-0">
				<button
					on:click={handleDeleteButton}
					class="text-error flex space-x-3 bg-primary-hover-token w-full p-2 rounded-full"
				>
					<span><DeleteIcon class="w-4 h-4" /></span>
					<span>Delete</span>
				</button>
			</li>
		</ul>
	</div>
</div>
