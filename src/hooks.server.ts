import { auth } from '$lib/server/lucia';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';

const trpcHandler = createTRPCHandle({
	router,
	createContext,
	onError: ({ type, path, error }) =>
		console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
});
export const handle: Handle = sequence(handleHooks(auth), trpcHandler);
