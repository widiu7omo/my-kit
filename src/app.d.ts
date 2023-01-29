// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('$lib/prisma').Auth;
	// eslint-disable-next-line @typescript-eslint/ban-types
	type UserAttributes = {
		username: string;
		rememberMe?: boolean;
	};
}

/// <reference types="@sveltejs/kit" />
declare namespace App {
	interface Locals {
		validate: import('@lucia-auth/sveltekit').Validate;
		validateUser: import('@lucia-auth/sveltekit').ValidateUser;
		setSession: import('@lucia-auth/sveltekit').SetSession;
	}
}
