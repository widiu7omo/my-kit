<script context="module" lang="ts">
	export interface ErrorInput {
		message: string;
		path: string[];
	}
</script>

<script lang="ts">
	import { classNames } from "$lib/helpers/ui";


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

	export let errors: ErrorInput[] | null = null;
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
	$: {
		debug && console.log(item);
	}
</script>

<div class="form-control w-full">
	<label class="label" for={name}>
		<span class="label-text text-sm text-gray-600"
			>{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</span>
		<!--    <span class="label-text-alt">Alt label</span>-->
	</label>
	<input
		id={name}
		{name}
		{type}
		{placeholder}
		value={item?.[name] ?? ''}
		on:focus={() => onFocus(name)}
		on:input={handleInput}
		class={classNames(
			'input w-full',
			errorInput ? 'input-error' : '',
			getVariant(),
			getColor(),
			getSize()
		)}
		aria-invalid={errorInput ? 'true' : undefined}
	/>
	<label class="label" for={name}>
		{#if errorInput}
			<span class="label-text-alt text-error">{errorInput.message}</span>
		{/if}
		<span class="label-text-alt">{helpText}</span>
		<!--    <span class="label-text-alt">Alt label</span>-->
	</label>
</div>
