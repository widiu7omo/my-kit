<script lang="ts">
	import { page } from '$app/stores';
	import AppBrand from './AppBrand.svelte';
	import HomeIcon from '../icons/HomeIcon.svelte';
	import UserIcon from '../icons/UserIcon.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import CreditCardIcon from '$lib/components/icons/CreditCardIcon.svelte';
	import { classNames } from '$lib/helpers/ui';
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<div
	id="sidebar-left"
	class="hidden lg:block bg-surface-500/5 w-64 p-4 h-full border-r border-surface-200-700-token"
>
	<AppBrand />
	<nav class="list-nav">
		<ul>
			<li>
				<a href="/" class={classNames(classesActive('/'), '!py-1')}
					><span class="badge"><HomeIcon /></span><span class="flex-auto text-sm font-medium"
						>Dashboard</span
					></a
				>
			</li>
			<li>
				<a href="/users" class={classNames(classesActive('/users'), '!py-1')}
					><span class="badge"><UserIcon /></span><span class="flex-auto text-sm font-medium"
						>Users</span
					></a
				>
			</li>
			<li>
				<a href="/subscriptions" class={classNames(classesActive('/subscriptions'), '!py-1')}
					><span class="badge"><CreditCardIcon /></span><span class="flex-auto text-sm font-medium"
						>Subscriptions</span
					></a
				>
			</li>
			<li>
				<a href="/settings" class={classNames(classesActive('/settings'), '!py-1')}
					><span class="badge"><SearchIcon /></span><span class="flex-auto text-sm font-medium"
						>Settings</span
					></a
				>
			</li>
		</ul>
	</nav>
</div>
