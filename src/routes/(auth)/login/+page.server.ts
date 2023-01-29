import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const rememberMe = Boolean(form.get('rememberMe'));
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			console.log('FAIL');
			return fail(400);
		}
		try {
			const user = await auth.createUser('email', username, {
				password,
				attributes: {
					username,
					rememberMe
				}
			}); //return user with custom attributes, check app.d.ts root file
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (e) {
			console.log(e);
			return fail(400);
		}
	}
};