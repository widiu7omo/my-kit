<script>
    import FrontLayout from "$lib/layouts/FrontLayout.svelte";
    import Hero from "$lib/modules/front/Hero.svelte";
    import PrimaryFeatures from "$lib/modules/front/PrimaryFeatures.svelte";
    import SecondaryFeatures from "$lib/modules/front/SecondaryFeatures.svelte";
    import CallToAction from "$lib/modules/front/CallToAction.svelte";
    import Testimonials from "$lib/modules/front/Testimonials.svelte";
    import Faqs from "$lib/modules/front/Faqs.svelte";
    import Pricing from "$lib/modules/front/Pricing.svelte";
</script>
<svelte:window class="light"></svelte:window>
<svelte:head>
    <title>TaxPal - Accounting made simple for small businesses</title>
    <meta name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."/>
</svelte:head>
<FrontLayout>
    <main>
        <Hero/>
        <PrimaryFeatures/>
        <SecondaryFeatures/>
        <CallToAction/>
        <Testimonials/>
        <Pricing/>
        <Faqs/>
    </main>
</FrontLayout>