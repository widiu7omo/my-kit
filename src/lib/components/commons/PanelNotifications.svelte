<script lang="ts">
	import { menu } from '@skeletonlabs/skeleton';
	import BellIcon from '../icons/BellIcon.svelte';
	import CreditCardIcon from '../icons/CreditCardIcon.svelte';
</script>

<div class="relative">
	<div class="relative inline-block">
		<span class="badge-icon variant-filled-secondary absolute -top-1 -right-1 z-10">2</span>
		<button class="btn btn-sm" use:menu={{ menu: 'notifications-menu', interactive: true }}>
			<BellIcon class="w-6 h-6" />
		</button>
	</div>
	<div class="mt-3 card w-[24rem] shadow" data-menu="notifications-menu">
		<div class="card-body !p-0">
			<dl class="list-dl p-2">
				<a href="/">
					<div class="bg-primary-hover-token">
						<span class="badge bg-primary-500">
							<BellIcon class="w-5 h-5" />
						</span>
						<span class="flex-auto">
							<dt class="text-sm">Order status updated</dt>
							<dd class="text-xs text-stone-500">Your order has been processed</dd>
						</span>
					</div>
				</a>
				<a href="/">
					<div class="bg-primary-hover-token">
						<span class="badge bg-primary-500">
							<CreditCardIcon class="w-5 h-5" />
						</span>
						<span class="flex-auto">
							<dt class="text-sm">Payment update</dt>
							<dd class="text-xs text-stone-500">Your customer has been purchase Indomie Goreng</dd>
						</span>
					</div>
				</a>
				<a href="/" class="w-fit"
					><div class="flex justify-end !py-0 !pb-2">
						<span
							class="text-xs font-medium text-primary-500 bg-primary-hover-token py-1 px-2 rounded-full"
							>Read more</span
						>
					</div></a
				>
			</dl>
		</div>
	</div>
</div>
