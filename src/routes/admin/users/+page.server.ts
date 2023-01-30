import { TABLE_ROWS_PER_PAGE } from '$lib/constants/constant';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.validate();
	console.log(session);
	if (!session) {
		// throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return {
		users: router.createCaller(await createContext(event)).users.list({
			query: event.url.searchParams.get('query') || undefined,
			limit: TABLE_ROWS_PER_PAGE
		}),
		count: router
			.createCaller(await createContext(event))
			.users.count({ query: event.url.searchParams.get('query') || undefined })
	};
};
