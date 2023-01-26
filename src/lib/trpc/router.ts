import { users } from './routes/users';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
// import delay from 'delay';
import { t } from '$lib/trpc/t';

export const router = t.router({
	// greeting: t.procedure.query(async () => {
	// 	await delay(500); // 👈 simulate an expensive operation
	// 	return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	// }),
	users
});

export type Router = typeof router;
// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
