import type {SvelteComponent} from 'svelte';
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

const suffixAdmin = "/admin"
export const sidebarMenuAdmin: MenuItem[] = [
    {name: 'Dashboard', href: suffixAdmin, icon: HomeIcon},
    {name: 'Users', href: suffixAdmin + '/users', icon: UserIcon},
    {name: 'Subscriptions', href: suffixAdmin + '/subscriptions', icon: CreditCardIcon},
    {name: 'Settings', href: suffixAdmin + '/settings', icon: SearchIcon},
    {name: 'Components', href: suffixAdmin + '/components', icon: ArchiveBoxIcon}
];
