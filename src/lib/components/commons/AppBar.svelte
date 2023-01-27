<script lang="ts">
	import { storeSidebarOpen } from '$lib/stores/commons/ui';
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import MenuBarIcon from '../icons/MenuBarIcon.svelte';
	import { browser } from '$app/environment';
	const handleSidebarToggle = () => {
		if (browser) storeSidebarOpen.set(!$storeSidebarOpen);
	};
	import PanelNotifications from './PanelNotifications.svelte';
	import PanelProfile from './PanelProfile.svelte';
	import Breadcrumbs from '$lib/components/commons/Breadcrumbs.svelte';
</script>

<AppBar padding="px-4 py-0">
	<svelte:fragment slot="lead">
		<button on:click={handleSidebarToggle}>
			<MenuBarIcon />
		</button>
	</svelte:fragment>
	<span class="block border-l border-surface-200-700-token h-16" />
	<svelte:fragment slot="trail">
		<PanelNotifications />
		<PanelProfile />
	</svelte:fragment>
</AppBar>
<Breadcrumbs />
