<script context="module" lang="ts">
	export interface SelectItem {
		label: string;
		value: string;
	}
</script>

<script lang="ts">
	import type { ErrorInput } from './Input.svelte';

	export let label: string;
	export let placeholder: string;
	export let name: string;
	export let item: Record<string, unknown> | null = null;
	export let items: SelectItem[] = [];
	export let errors: ErrorInput[] | null = null;
	export let required: boolean = false;
	export let disabled: boolean = false;
	$: errorInput = errors?.find((e) => e.path.includes(name));
	const cLabelInputError = 'text-error-500-400-token';
	const cInputRequired = "after:content-['*'] after:ml-0.5 after:text-red-500";
	const cInputError =
		'!border !border-error-300-600-token focus:!border-error-400-500-token !bg-error-50/20 dark:!bg-error-900/20 placeholder-error-500';
</script>

<div class="text-sm mb-1">
	<label
		for={name}
		class="block text-sm font-medium {required && cInputRequired} {errorInput
			? cLabelInputError
			: 'text-surface-600-300-token'}"
		>{label}
	</label>
	{#if errorInput}
		<p id="helper-{name}" class="!text-xs font-normal text-error-400-500-token">
			{errorInput.message}
		</p>
	{/if}
</div>
<select
	{disabled}
	id={name}
	{name}
	value={item?.[name]}
	class="text-sm font-base {errorInput
		? cLabelInputError
		: 'text-surface-600-300-token'} {errorInput && cInputError}"
>
	<option value="" selected>{placeholder}</option>
	{#each items as item (item.label)}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>
