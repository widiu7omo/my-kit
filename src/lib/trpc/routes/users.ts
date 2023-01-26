import { logger } from './../middlewares/logger';
import { t } from '../t';
import { z } from 'zod';
import db from '$lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const users = t.router({
	list: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(({ input }) => {
			return db.user.findMany({
				select: {
					id: true,
					name: true,
					email: true
				},
				orderBy: {
					name: 'desc'
				},
				where: input
					? {
							OR: [{ name: { contains: input } }, { email: { contains: input } }]
					  }
					: undefined
			});
		}),
	save: t.procedure
		.use(logger)
		// .use(auth) // 👈 use auth middleware
		.input(
			z.object({
				id: z.string().nullable(),
				name: z.string().min(3).max(50).nullable(),
				email: z.string().email()
			})
		)
		.mutation(async ({ input: { id, ...rest } }) => {
			if (id) {
				try {
					await db.user.update({
						data: { ...rest },
						where: { id }
					});
				} catch (e) {
					if (e instanceof PrismaClientKnownRequestError) {
						// The .code property can be accessed in a type-safe manner
						throw e.message;
					}
					throw e;
				}
			} else {
				try {
					await db.user.create({
						data: { ...rest }
					});
				} catch (e) {
					if (e instanceof PrismaClientKnownRequestError) {
						// The .code property can be accessed in a type-safe manner
						throw e.message;
					}
					throw e;
				}
			}
		}),

	delete: t.procedure
		.use(logger)
		// .use(auth) // 👈 use auth middleware
		.input(z.string())
		.mutation(async ({ input: id }) => {
			await db.user.delete({ where: { id } });
		})
});
