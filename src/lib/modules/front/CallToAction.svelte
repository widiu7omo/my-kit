<script>
    import Container from "$lib/components/commons/Container.svelte";

    import backgroundImage from "$lib/assets/images/background-call-to-action.jpg";
</script>

<section
        id="get-started-today"
        class="relative overflow-hidden bg-blue-600 py-32"
>
    <img
            class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
            src={backgroundImage}
            alt=""
            width={2347}
            height={1244}
    />
    <Container class="relative">
        <div class="mx-auto max-w-lg text-center">
            <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl">
                Get started today
            </h2>
            <p class="mt-4 text-lg tracking-tight text-white">
                It’s time to take control of your books. Buy our software so you can
                feel like you’re doing something productive.
            </p>
            <a href="/register"
               class="mt-10 group inline-flex items-center justify-center !rounded-full !py-2 !px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white !text-slate-900 hover:bg-slate-200 hover:text-slate-700 active:bg-slate-800 active:text-slate-800 focus-visible:outline-slate-900">
                Get 6 months free
            </a>
        </div>
    </Container>
</section>