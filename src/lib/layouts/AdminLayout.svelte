<script lang="ts">
	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import AppBar from '$lib/components/commons/AppBar.svelte';
	import SidebarLeft from '$lib/components/commons/SidebarLeft.svelte';
	import { storeSidebarOpen } from '$lib/stores/commons/ui';
	import { Toaster } from 'svelte-french-toast';
</script>
<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $storeSidebarOpen}
			<SidebarLeft />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
<Modal />
<Toaster position="top-right" />
