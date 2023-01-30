import {auth} from '$lib/server/lucia';
import {fail, redirect} from '@sveltejs/kit';
import type {Actions, PageServerLoad} from './$types';
import {errorInputGenerator, errorInputGeneratorAuth} from "../../../lib/constants/errors";
import {LuciaError} from "lucia-auth";

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.validate();
    if (session) throw redirect(302, '/');
    return {};
};

export const actions: Actions = {
    login: async ({request, locals}) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');
        // TODO: remember ME
        const rememberMe = Boolean(form.get('rememberMe'));
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return fail(400, {errors: errorInputGenerator("Fields is required", 'email', 'password')});
        }
        try {
            const user = await auth.authenticateUser('email', email, password); //return user with custom attributes, check app.d.ts root file
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        } catch (e) {
            if (e instanceof LuciaError) {
                return fail(400, {errors: errorInputGeneratorAuth(e.message)});
            }
            return fail(400, {errors: [{message: "Internal Server Error"}]})
        }
    },
    logout: async ({locals}) => {
        const session = await locals.validate();
        if (!session) return fail(401);
        await auth.invalidateSession(session.sessionId);
        locals.setSession(null);
        throw redirect(302, '/login')
    }
};
