<script context="module" lang="ts">
	export interface ErrorInput {
		message: string;
		path: string[];
	}
</script>

<script lang="ts">
	import { classNames } from '$lib/helpers/ui';

	export let debug: boolean = false;
	export let name: string;
	export let placeholder = '';
	export let label = '';
	export let helpText = '';
	export let required = false;
	export let price = false;
	export let item: Record<string, unknown> | null;
	export let size = '';
	export let color = '';
	export let variant = '';
	export let errors: ErrorInput[] | null = null;

	const getVariant = () => {
		switch (variant) {
			case 'bordered':
				return 'input-bordered';
			case 'ghost':
				return 'input-ghost';
			default:
				return '';
		}
	};
	const getColor = () => {
		switch (color) {
			case 'primary':
				return 'input-primary';
			case 'accent':
				return 'input-accent';
			case 'error':
				return 'input-error';
			case 'info':
				return 'input-info';
			case 'secondary':
				return 'input-secondary';
			case 'success':
				return 'input-success';
			case 'warning':
				return 'input-warning';
			default:
				return '';
		}
	};
	const getSize = () => {
		switch (size) {
			case 'lg':
				return 'input-lg';
			case 'md':
				return 'input-md';
			case 'sm':
				return 'input-sm';
			case 'xs':
				return 'input-xs';
			default:
				return 'input-md';
		}
	};

	let type = price ? 'number' : 'text';
	$: errorInput = errors?.find((e) => e.path.includes(name));
	function onFocus(name: string) {
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
	const cLabelInputError = 'text-error-500-400-token';
	const cInputError =
		'!border !border-error-300-600-token focus:!border-error-400-500-token !bg-error-50/20 dark:!bg-error-900/20 placeholder-error-500';
	$: {
		debug && console.log(item);
	}
</script>

<div class="form-control w-full">
	<label for={name} class="block mb-2 text-sm font-medium {errorInput && cLabelInputError}"
		>{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}</label
	>
	<input
		id={name}
		{name}
		{type}
		{placeholder}
		value={item?.[name] ?? ''}
		on:focus={() => onFocus(name)}
		on:input={handleInput}
		aria-invalid={errorInput ? 'true' : undefined}
		class="{errorInput && cInputError} text-sm rounded-lg block w-full p-2.5"
	/>
	<p class="mt-2 text-xs">
		{#if errorInput}
			<span class="text-xs font-medium {cLabelInputError}">{errorInput.message}</span>
		{:else}
			<span class="text-xs text-surface-400-500-token">{helpText}</span>
		{/if}
	</p>
</div>
