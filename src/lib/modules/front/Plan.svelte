<script>
    export let name, price, description, href, features, featured = false
</script>
<section class="flex flex-col rounded-3xl px-6 sm:px-8 {featured ? 'order-first bg-blue-600 py-8 lg:order-none' : 'lg:py-8'}">
    <h3 class="mt-5 font-display !text-lg text-white">{name}</h3>
    <p class="mt-2 !text-base tracking-wider font-light {featured ? 'text-white' : 'text-slate-400'}">
        {description}
    </p>
    <p class="order-first font-display !text-5xl !font-light !tracking-tight text-white">
        {price}
    </p>
    <ul role="list" class="order-last mt-10 flex flex-col gap-y-3 text-sm { featured ? 'text-white' : 'text-slate-200'}">
        {#each features as feature}
            <li class="flex">
                <svg aria-hidden="true" class="h-6 w-6 flex-none fill-current stroke-current {featured ? 'text-white' : 'text-slate-400'}">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" stroke-width="{0}"/>
                    <circle cx={12} cy={12} r={8.25} fill="none" stroke-width="{1.5}" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="ml-4">{feature}</span>
            </li>
        {/each}
    </ul>
    <a
            {href}
            class="group mt-10 {featured ? 'bg-white !text-slate-900 hover:bg-slate-300 hover:text-slate-100 ' : 'bg-slate-900 !text-white border border-slate-500 hover:bg-slate-700 hover:text-slate-100 '} inline-flex items-center justify-center !rounded-full !py-2 !px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            aria-label={`Get started with the ${name} plan for ${price}`}
    >
        Get started
    </a>
</section>