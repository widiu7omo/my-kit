<script lang="ts">
	import type { ErrorInput } from './Input';

	export let label: string;
	export let placeholder: string;
	export let name: string;
	export let rows: number = 4;
	export let item: Record<string, unknown> | null = null;
	export let errors: ErrorInput[] | null = null;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let helpText: string = '';
	$: errorInput = errors?.find((e) => e.path.includes(name));
	const cInputRequired = "after:content-['*'] after:ml-0.5 after:text-red-500";
	const cLabelInputError = 'text-error-500-400-token';
	const cInputError =
		'!border !border-error-300-600-token focus:!border-error-400-500-token !bg-error-50/20 dark:!bg-error-900/20 placeholder-error-500';
</script>

<div class="form-control w-full">
	<label
		for={name}
		class="block mb-2 text-sm font-medium {required && cInputRequired} {errorInput
			? cLabelInputError
			: 'text-surface-600-300-token'}"
		>{label}
	</label>
	<textarea
		id={name}
		{rows}
		{disabled}
		class="block w-full text-sm t-surface-600-300-token !rounded-token {errorInput && cInputError}"
		{placeholder}
		value={String(item?.[name] ?? '')}
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
