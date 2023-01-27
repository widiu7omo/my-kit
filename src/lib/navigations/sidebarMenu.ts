import type { SvelteComponent } from 'svelte';
import HomeIcon from '$lib/components/icons/HomeIcon.svelte';
import UserIcon from '$lib/components/icons/UserIcon.svelte';
import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
import CreditCardIcon from '$lib/components/icons/CreditCardIcon.svelte';
import ArchiveBoxIcon from '$lib/components/icons/ArchiveBoxIcon.svelte';
export interface MenuItem {
	name: string;
	href: string;
	icon: typeof SvelteComponent;
	child?: MenuItem;
}

export const sidebarMenu: MenuItem[] = [
	{ name: 'Dashboard', href: '/', icon: HomeIcon },
	{ name: 'Users', href: '/users', icon: UserIcon },
	{ name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
	{ name: 'Settings', href: '/settings', icon: SearchIcon },
	{ name: 'Components', href: '/components', icon: ArchiveBoxIcon }
];
