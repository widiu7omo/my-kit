<script>

	import { Avatar, menu } from "@skeletonlabs/skeleton";

</script>
<div class="relative">
	<button class="btn btn-sm p-0" use:menu={{ menu: 'profile-menu', interactive: true }}>
		<div class="relative inline-block">
			<span class="badge badge-filled-primary absolute -top-3 -right-4 z-10">50k</span>
			<Avatar
				src="https://i.pravatar.cc/"
				width="w-10"
				rounded="rounded-full"
				border="border-none"
			/>
		</div>
	</button>
	<div class="card p-2 w-52 shadow-xl" data-menu="profile-menu">
		<ul class="list-nav !space-y-1">
			<li><a class="!px-4 !py-2 text-sm" href="/">Home</a></li>
			<li><a class="!px-4 !py-2 text-sm" href="/">Blog</a></li>
			<li><a class="!px-4 !py-2 text-sm" href="/">About</a></li>
			<li>
				<button class="w-full btn btn-sm btn-filled-primary"
					><span class="!text-center text-sm">Logout</span></button
				>
			</li>
		</ul>
	</div>
</div>
