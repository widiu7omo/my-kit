<script lang="ts">
    import {page} from '$app/stores';
    import AppBrand from './AppBrand.svelte';
    import {classNames} from '$lib/helpers/ui';
    import {sidebarMenuAdmin} from '$lib/navigations/sidebar';

    $: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<div
        id="sidebar-left"
        class="hidden lg:block bg-surface-500/5 w-64 p-4 h-full border-r border-surface-200-700-token"
>
    <AppBrand/>
    <nav class="list-nav">
        <ul>
            {#each sidebarMenuAdmin as sidebarItem (sidebarItem.name)}
                <li>
                    <a href={sidebarItem.href} class={classNames(classesActive(sidebarItem.href), '!py-1')}
                    ><span class="badge"><svelte:component this={sidebarItem.icon}/></span><span
                            class="flex-auto text-sm font-medium">{sidebarItem.name}</span
                    ></a
                    >
                </li>
            {/each}
        </ul>
    </nav>
</div>
