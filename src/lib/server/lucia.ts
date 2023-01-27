import lucia from 'lucia-auth';
import prisma from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import db from '$lib/prisma';
export const auth = lucia({
	adapter: prisma(db),
	env: dev ? 'DEV' : 'PROD'
});
export type Auth = typeof auth;
