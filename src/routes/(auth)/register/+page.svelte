<script lang="ts">
    import {enhance} from '$app/forms';
    import type {PageData, ActionData} from "./$types";
    import TextInput from '$lib/components/commons/inputs/TextInput.svelte';
    import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
    import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
    import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
    import AuthLayout from '$lib/layouts/AuthLayout.svelte';

    let item: { username?: string; password?: string; rememberMe?: false } = {};
    let errors: { message: string; path: string[] }[] | null = null;
    export let data: PageData
    export let form: ActionData;

    $:{
        errors = form?.errors
    }
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>
<AuthLayout>
    <div class="w-[480px] card p-8 mx-auto my-auto space-y-6 shadow">
        <div class="">
            <SearchIcon class="w-8 h-8 bg-gradient-to-t text-primary-400-500-token"/>
        </div>
        <div>
            <h3 class="font-bold">Create your Account</h3>
            <small class="text-surface-500-400-token"
            >Start your website in seconds. Already have an account? <a
                    href="/login"
                    class="font-medium text-primary-400-500-token !no-underline">Sign in here</a
            ></small
            >
        </div>
        <form use:enhance method="post" class="space-y-2">
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <TextInput name="name" {item} {errors} label="Full Name" placeholder="e.g Sam Sonny"/>
                    <TextInput
                            name="email"
                            {item}
                            {errors}
                            label="Your email"
                            placeholder="name@company.com"
                    />
                    <TextInput
                            secure
                            name="password"
                            {item}
                            {errors}
                            label="Password"
                            placeholder="••••••••"
                    />
                    <TextInput
                            name="confirmPassword"
                            secure
                            {item}
                            {errors}
                            label="Confirm Password"
                            placeholder="••••••••"
                    />
                </div>
            </div>
            <div class="flex items-end justify-end">
                <button type="submit" class="btn variant-filled-primary w-full mt-3">
                    Create an account
                </button>
            </div>
        </form>
        <div class="relative">
            <hr class="absolute top-3 w-full"/>
            <div class="flex justify-center">
                <p
                        class="text-center text-sm text-surface-500-400-token px-2 bg-surface-100-800-token w-fit z-10"
                >
                    or
                </p>
            </div>
        </div>
        <div class="flex flex-col justify-between items-center text-xs">
            <div class="flex-row flex w-full space-x-4 items-center justify-between">
                <button class="btn  flex-1 text-center variant-ghost-primary"
                ><span><AppleIcon/></span> <span>Apple</span>
                </button>
                <button class="btn  flex-1 text-center variant-ghost-primary"
                ><span><GoogleIcon/></span> <span>Google</span>
                </button>
            </div>
        </div>
    </div>
</AuthLayout>
