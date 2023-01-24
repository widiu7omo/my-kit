<script lang="ts">
	import { storeSidebarOpen } from '$lib/stores/commons/ui';
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import MenuBarIcon from '../icons/MenuBarIcon.svelte';
	import BellIcon from '$lib/components/icons/BellIcon.svelte';
	const handleSidebarToggle = () => {
		storeSidebarOpen.set(!$storeSidebarOpen);
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button on:click={handleSidebarToggle}>
			<MenuBarIcon />
		</button>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a class="btn btn-sm btn-ghost-surface" href="#" rel="noreferrer">
			<BellIcon />
		</a>
		<button class="btn btn-sm p-0">
			<Avatar
				src="https://i.pravatar.cc/"
				width="w-10"
				rounded="rounded-full"
				border="border-none"
			/>
		</button>
	</svelte:fragment>
</AppBar>
