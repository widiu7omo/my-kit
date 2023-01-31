<script lang="ts">
    import {enhance} from '$app/forms';
    import Checkbox from '$lib/components/commons/inputs/Checkbox.svelte';
    import TextInput from '$lib/components/commons/inputs/TextInput.svelte';
    import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
    import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
    import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
    import AuthLayout from '$lib/layouts/AuthLayout.svelte';
    import {t} from "$lib/i18n/generated/index.js";
    import type {ActionData} from "./$types";
    import type {ErrorInput} from "$lib/components/commons/inputs/Input";

    let item: { username?: string; password?: string; rememberMe?: false } = {};
    let errors: ErrorInput[] | null;
    let alertError: boolean = false;
    let alertMessage: string = ''

    const cleanUp = () => {
        alertError = false;
        alertMessage = ''
    }
    export let form: ActionData;
    $:{
        errors = (form ? form.errors : undefined) as ErrorInput[]
        if (errors?.length > 0) {
            if (errors[0].path.every(val => val === "")) {
                alertError = true;
                alertMessage = errors[0].message
            }
        }
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>
<AuthLayout>
    <div class="w-[480px] card p-8 mx-auto my-auto space-y-6 shadow">
        <div class="">
            <SearchIcon class="w-8 h-8 bg-gradient-to-t text-primary-400-500-token"/>
        </div>
        <div>
            {#if alertError}
                <div class="bg-error-100/20 dark:bg-error-800/20 border border-error-400-500-token rounded-token p-3 mb-4">
                    <p class="!text-xs font-medium text-error-400-500-token">{alertMessage}</p>
                </div>
            {/if}
            <h3 class="font-bold">{$t.page.login.login_title}</h3>
            <small class="text-surface-500-400-token">
                {$t.page.login.login_desc}
                <a
                        href="/register"
                        class="font-medium text-primary-400-500-token !no-underline">
                    &nbsp;{$t.page.login.sign_up}
                </a>
            </small>
        </div>
        <form use:enhance method="post" class="space-y-2" action="?/login">
            <div class="space-y-4">
                <TextInput
                        name="email"
                        on:focus={cleanUp}
                        {item}
                        {errors}
                        label="Your email / username"
                        placeholder="name@company.com"
                />
                <TextInput name="password" secure {item} {errors} label="Password" placeholder="••••••••"/>
                <div class="flex justify-between flex-row items-center">
                    <Checkbox
                            {item}
                            label="Remember Me"
                            customLabelStyle="!font-normal !text-surface-500-400-token"
                            {errors}
                            name="rememberMe"
                    />
                    <a href="/" class="font-medium text-xs text-primary-400-500-token !no-underline "
                    >Forgot Password?</a
                    >
                </div>
            </div>
            <div class="flex items-end justify-end">
                <button type="submit" class="btn variant-filled-primary w-full mt-3">Sign in</button>
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
