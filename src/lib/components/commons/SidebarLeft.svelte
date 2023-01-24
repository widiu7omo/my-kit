<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { get, writable, type Writable } from 'svelte/store';
	// Only server svelte kit avaiable
	import { page } from '$app/stores';
	import AppBrand from './AppBrand.svelte';
	import { goto } from '$app/navigation';
	import HomeIcon from '../icons/HomeIcon.svelte';
	import UserIcon from '../icons/UserIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import CreditCardIcon from '$lib/components/icons/CreditCardIcon.svelte';
	import SidebarLeftItem from './SidebarLeftItem.svelte';
	const storeSingle: Writable<string> = writable($page.url.pathname);
	const handleClick = () => {
		const selectedMenu = get(storeSingle);
		goto(selectedMenu);
	};
</script>

<div id="sidebar-left" class="hidden lg:block bg-surface-500/5 w-56 p-4 h-full">
	<AppBrand />
	<ListBox selected={storeSingle}>
		<SidebarLeftItem icon={HomeIcon} on:click={handleClick} value="/">
			<span class="text-sm font-medium">Dashboard</span>
		</SidebarLeftItem>
		<SidebarLeftItem icon={UserIcon} on:click={handleClick} value="/users">
			<span class="text-sm font-medium">Users</span>
		</SidebarLeftItem>
		<SidebarLeftItem icon={CreditCardIcon} on:click={handleClick} value="/subscriptions">
			<span class="text-sm font-medium">Subscriptions</span>
		</SidebarLeftItem>
		<SidebarLeftItem icon={SearchIcon} on:click={handleClick} value="/settings">
			<span class="text-sm font-medium">Settings</span>
		</SidebarLeftItem>
	</ListBox>
</div>
