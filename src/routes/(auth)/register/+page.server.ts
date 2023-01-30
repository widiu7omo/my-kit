import {auth} from '$lib/server/lucia';
import {fail, redirect} from '@sveltejs/kit';
import type {Actions, PageServerLoad} from './$types';
import {LuciaError} from "lucia-auth";
import {errorInputGenerator} from "$lib/constants/errors";

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.validate();
    if (session) {
        throw redirect(302, '/');
    }
    return {};
};

export const actions: Actions = {
    default: async ({request, locals}) => {
        const form = await request.formData();
        const name = form.get('name');
        const email = form.get('email');
        console.log(email)
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        if (password !== confirmPassword) {
            return fail(400, {
                errors: errorInputGenerator("AUTH_WRONG_CONFIRM_PASSWORD")
            });
        }
        if (
            !name ||
            !password ||
            !email ||
            typeof name !== 'string' ||
            typeof password !== 'string' ||
            typeof email !== 'string'
        ) {
            console.log('FAIL');
            return fail(400);
        }
        try {
            const user = await auth.createUser('email', email, {
                password,
                attributes: {
                    name, email
                }
            }); //return user with custom attributes, check app.d.ts root file
            const session = await auth.createSession(user.userId);
            locals.setSession(session);
        } catch (e) {
            if (e instanceof LuciaError) {

                return fail(403, {errors: errorInputGenerator(e.message)})
            }
            return fail(400, {message: "Internal Error"});
        }
    }
};
