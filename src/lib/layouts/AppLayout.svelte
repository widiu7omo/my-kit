<script lang="ts">
    import {AppShell, Modal} from '@skeletonlabs/skeleton';
    import {Toaster} from 'svelte-french-toast';
    import AppBrand from "$lib/components/commons/AppBrand.svelte";
    import CloseIcon from "$lib/components/icons/CloseIcon.svelte";
    import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
    import Container from "$lib/components/commons/Container.svelte";

    export const dashboardConfig = {
        mainNav: [
            {
                title: "Documentation",
                href: "/docs",
            },
            {
                title: "Support",
                href: "/support",
                disabled: true,
            },
        ],
        sidebarNav: [
            {
                title: "Posts",
                href: "/dashboard",
                icon: "post",
            },
            {
                title: "Pages",
                href: "/",
                icon: "page",
                disabled: true,
            },
            {
                title: "Media",
                href: "/",
                icon: "media",
                disabled: true,
            },
            {
                title: "Billing",
                href: "/dashboard/billing",
                icon: "billing",
            },
            {
                title: "Settings",
                href: "/dashboard/settings",
                icon: "settings",
            },
        ],
    }
    const items = dashboardConfig.mainNav;
    let showMobileMenu = true;

    function setShowMobileMenu(state: boolean) {
        showMobileMenu = state;
    }
</script>
<Container>
    <AppShell>
        <svelte:fragment slot="pageHeader">
            <header class="container sticky top-0 z-40 bg-white">
                <div class="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
                    <div class="flex gap-6 md:gap-10">
                        <a href="/" class="hidden items-center space-x-2 md:flex">
                            <AppBrand/>
                            <span class="hidden font-bold sm:inline-block"></span>
                        </a>
                        <nav class="hidden gap-6 md:flex">
                            {#each items as item, index(index)}
                                <a href={item.disabled ? "#" : item.href}
                                   class="flex items-center text-lg font-semibold text-slate-600 sm:text-sm text-slate-900 {item.disabled && 'cursor-not-allowed opacity-80'}">
                                    {item.title}
                                </a>
                            {/each}
                        </nav>

                        <!--{showMobileMenu && <MobileNav items={items}>{children}</MobileNav>}-->
                    </div>
                    <!--                <UserAccountNav-->
                    <!--                        user={{-->
                    <!--              name: user.name,-->
                    <!--              image: user.image,-->
                    <!--              email: user.email,-->
                    <!--            }}-->
                    <!--                />-->
                </div>
            </header>
        </svelte:fragment>
        <svelte:fragment slot="sidebarLeft">
            <aside class="hidden w-[200px] flex-col md:flex">
                <nav class="grid items-start gap-2">
                    {#each dashboardConfig.sidebarNav as item,index (index)}
                        <a href={item.disabled ? "/" : item.href}>
                    <span class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 {item.disabled && 'cursor-not-allowed opacity-80'}">
                      <SearchIcon class="mr-2 h-4 w-4"/>
                      <span>{item.title}</span>
                    </span>
                        </a>
                    {/each}
                </nav>
                <!--            <DashboardNav items={dashboardConfig.sidebarNav}/>-->
            </aside>
        </svelte:fragment>
        <slot/>
    </AppShell>
</Container>
<Modal/>
<Toaster position="top-right"/>
