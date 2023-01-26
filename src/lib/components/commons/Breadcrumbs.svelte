<script lang="ts">
	import FolderIcon from '../icons/FolderIcon.svelte';
	import { page } from '$app/stores';

	let routeNames: string[] = [];
	let pathNames = $page.url.pathname.split('/');
	pathNames.forEach((item, key) => {
		if (key === 0) {
			routeNames[key] = '';
		} else {
			routeNames[key] = routeNames[key - 1] + '/' + item;
		}
	});
</script>

<div class="bg-surface-100-800-token border-y border-surface-200-700-token shadow">
	<ol class="breadcrumb px-4 py-1">
		{#each routeNames as routeName, index (routeName)}
			{#if routeName !== ''}
				<li class="crumb">
					<a href={routeName} class="text-xs">
						{pathNames[index].charAt(0).toUpperCase() + pathNames[index].slice(1)}
					</a>
				</li>
			{:else}
				<li class="crumb">
					<a href="/" class="text-xs"> Home </a>
				</li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			{/if}
		{/each}
	</ol>
</div>
