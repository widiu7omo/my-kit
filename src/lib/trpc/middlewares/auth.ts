import { t } from '$lib/trpc/t';
import { TRPCError } from '@trpc/server';

export const authTrpc = t.middleware(async ({ next, ctx }) => {
	// console.log(ctx);
	// if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next();
});
