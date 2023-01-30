<script>
	import '../lib/constants/themes/default.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	handleSession(page);
</script>

<slot />
