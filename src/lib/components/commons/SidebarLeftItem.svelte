<script lang="ts">
	import { ListBoxItem } from '@skeletonlabs/skeleton';
	import { createEventDispatcher, type SvelteComponent } from 'svelte';
	export let icon: typeof SvelteComponent;
	export let value: string;
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click', {});
	};
</script>

<ListBoxItem padding="px-4 py-2" on:click={handleClick} {value}>
	<div class="flex flex-row space-x-2 items-center">
		<svelte:component this={icon} />
		<slot />
	</div>
</ListBoxItem>
