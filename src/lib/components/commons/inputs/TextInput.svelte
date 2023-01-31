<script lang="ts">
    import type {ErrorInput} from './Input';
    import {createEventDispatcher} from "svelte";

    export let debug: boolean = false;
    export let name: string;
    export let placeholder = '';
    export let label = '';
    export let helpText = '';
    export let required = false;
    export let disabled = false;
    export let price = false;
    export let secure = false;
    export let ref: HTMLInputElement | null;
    export let item: Record<string, unknown> | null;
    export let errors: ErrorInput[] | null = null;
    const dispatch = createEventDispatcher()
    let type = price ? 'number' : 'text';
    type = secure ? 'password' : type;
    $: errorInput = errors?.find((e) => e.path.includes(name));

    function onFocus(name: string) {
        dispatch('focus')
        if (item?.[name]) {
            errorInput = undefined;
        }
    }

    const handleInput = (e: any) => {
        const targetElement = e.target as HTMLInputElement;
        if (typeof item?.[name] != 'undefined') {
            let val = type.match(/^(number|range)$/) ? +targetElement.value : targetElement.value;
            item[name] = val;
        }
    };
    const cInputRequired = "after:content-['*'] after:ml-0.5 after:text-red-500";
    const cLabelInputError = 'text-error-500-400-token';
    const cInputError =
        '!border !border-error-300-600-token focus:!border-error-400-500-token !bg-error-50/20 dark:!bg-error-900/20 placeholder-error-500';
    $: {
        debug && console.log(item);
    }
</script>

<div class="form-control w-full">
    <label
            for={name}
            class="block mb-2 text-sm font-medium {required && cInputRequired} {errorInput
			? cLabelInputError
			: 'text-surface-600-300-token'}"
    >{label}
    </label>
    <input
            bind:this={ref}
            id={name}
            {name}
            {type}
            {placeholder}
            {disabled}
            value={item?.[name] ?? ''}
            on:focus={() => onFocus(name)}
            on:input={handleInput}
            aria-invalid={errorInput ? 'true' : undefined}
            class="{errorInput && cInputError} text-sm rounded-lg block w-full p-2.5"
    />
    <p class="mt-1 text-xs">
        {#if errorInput}
            <p id="helper-{name}" class="!text-xs font-normal text-error-400-500-token">
                {errorInput.message}
            </p>
        {:else}
            <span class="text-xs text-surface-400-500-token">{helpText}</span>
        {/if}
    </p>
</div>
