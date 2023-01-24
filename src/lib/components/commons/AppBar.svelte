<script lang="ts">
	import { storeSidebarOpen } from '$lib/stores/commons/ui';
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import MenuBarIcon from '../icons/MenuBarIcon.svelte';
	import BellIcon from '$lib/components/icons/BellIcon.svelte';
	const handleSidebarToggle = () => {
		storeSidebarOpen.set(!$storeSidebarOpen);
	};
	import PanelNotifications from './PanelNotifications.svelte';
	import PanelProfile from './PanelProfile.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button on:click={handleSidebarToggle}>
			<MenuBarIcon />
		</button>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<PanelNotifications />
		<PanelProfile />
	</svelte:fragment>
</AppBar>
