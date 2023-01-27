import { TABLE_ROWS_PER_PAGE } from '$lib/constants/constant';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => ({
	users: router.createCaller(await createContext(event)).users.list({
		query: event.url.searchParams.get('query') || undefined,
		limit: TABLE_ROWS_PER_PAGE
	}),
	count: router
		.createCaller(await createContext(event))
		.users.count({ query: event.url.searchParams.get('query') || undefined })
});
