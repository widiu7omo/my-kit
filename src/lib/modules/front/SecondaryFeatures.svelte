<script lang="ts">
    import screenshotContacts from '$lib/assets/images/screenshots/contacts.png'
    import screenshotInventory from '$lib/assets/images/screenshots/inventory.png'
    import screenshotProfitLoss from '$lib/assets/images/screenshots/profit-loss.png'
    import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
    import HomeIcon from "$lib/components/icons/HomeIcon.svelte";
    import ArchiveBoxIcon from "$lib/components/icons/ArchiveBoxIcon.svelte";
    import Container from "$lib/components/commons/Container.svelte";

    let selectedIndex = 0;
    const handleSelectIndex = (index: number) => {
        selectedIndex = index
    }
    $:transform = `translateX(-${selectedIndex * 100}%)`
    const features = [
        {
            name: 'Reporting',
            summary: 'Stay on top of things with always up-to-date reporting features.',
            description:
                'We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.',
            image: screenshotProfitLoss,
            icon: SearchIcon
        },
        {
            name: 'Inventory',
            summary:
                'Never lose track of what’s in stock with accurate inventory tracking.',
            description:
                'We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.',
            image: screenshotInventory,
            icon: HomeIcon

        },
        {
            name: 'Contacts',
            summary:
                'Organize all of your contacts, service providers, and invoices in one place.',
            description:
                'This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.',
            image: screenshotContacts,
            icon: ArchiveBoxIcon
        },
    ]
</script>
<section
        id="secondary-features"
        aria-label="Features for simplifying everyday business tasks"
        class="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32"
>
    <Container>
        <div class="mx-auto max-w-2xl md:text-center">
            <h2 class="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                Simplify everyday business tasks.
            </h2>
            <p class="mt-4 text-lg tracking-tight text-slate-700">
                Because you’d probably be a little confused if we suggested you
                complicate your everyday business tasks instead.
            </p>
        </div>
        <!--MOBILE VERSION-->
        <div class="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {#each features as feature,index (index)}
                <div>
                    <div class="mx-auto max-w-2xl {selectedIndex === index && 'opacity-75 hover:opacity-100'}">
                        <div class="w-9 rounded-lg
                                {selectedIndex === index ? 'bg-blue-600' : 'bg-slate-500'}">
                            <svelte:component this={feature.icon}/>
                        </div>
                        <h3 class="mt-6 text-sm font-medium{selectedIndex ? 'text-blue-600' : 'text-slate-600'}">
                            {feature.name}
                        </h3>
                        <p class="mt-2 font-display text-xl text-slate-900">
                            {feature.summary}
                        </p>
                        <p class="mt-4 text-sm text-slate-600">{feature.description}</p>
                    </div>
                    <div class="relative mt-10 pb-10">
                        <div class="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6"></div>
                        <div class="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                            <img class="w-full" src={feature.image} alt="" sizes="52.75rem"/>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="hidden lg:mt-20 lg:block">
            <div class="grid grid-cols-3 gap-x-8">
                {#each features as feature,featureIndex(featureIndex)}
                    <div on:click={()=>handleSelectIndex(featureIndex)}
                         class="relative cursor-pointer {selectedIndex !== featureIndex && 'opacity-75 hover:opacity-100'}">
                        <div class="w-9 rounded-lg
                                {selectedIndex === featureIndex ? 'bg-blue-600' : 'bg-slate-500'}">
                            <svelte:component this={feature.icon} class="items-center text-center p-2"/>
                        </div>
                        <div class="mt-6 text-sm font-medium {selectedIndex === featureIndex ? 'text-blue-600' : 'text-slate-600'}">
                            <div class="[&:not(:focus-visible)]:focus:outline-none">
                                <span class="absolute inset-0"></span>
                                {feature.name}
                            </div>
                        </div>
                        <p class="mt-2 font-mono !text-xl text-slate-900">
                            {feature.summary}
                        </p>
                        <p class="mt-4 !text-sm text-slate-600">{feature.description}</p>
                    </div>
                {/each}
            </div>
            <div class="relative mt-20 overflow-hidden rounded-[2rem] bg-slate-200 px-14 py-16 xl:px-16">
                <div class="-mx-5 flex">
                    {#each features as feature,featureIndex(featureIndex)}
                        <div
                                class="px-5 transition  duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none {featureIndex !== selectedIndex && 'opacity-60'}"
                                style:transform
                                aria-hidden={featureIndex !== selectedIndex}
                        >
                            <div
                                    class="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                                <img class="w-full" src={feature.image} alt="" sizes="52.75rem"/>
                            </div>
                        </div>
                    {/each}
                </div>
                <div class="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10"></div>
            </div>
        </div>
    </Container>
</section>