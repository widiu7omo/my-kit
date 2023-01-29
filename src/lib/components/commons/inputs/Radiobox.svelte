<script lang="ts">
	import type { ErrorInput } from './Input.svelte';

	export let label: string;
	export let name: string;
	export let item: Record<string, unknown> | null = null;
	export let errors: ErrorInput[] | null = null;
	export let required: boolean = false;
	export let disabled: boolean = false;

	$: errorInput = errors?.find((e) => e.path.includes(name));
	const cInputRequired = "after:content-['*'] after:ml-0.5 after:text-red-500";
	const cLabelInputError = 'text-error-500-400-token';
	const cInputError =
		'!border !border-error-300-600-token focus:!ring-error-50-900-token focus:!outline-none focus:!border-none focus:!ring-none focus:!outline-error-200-700-token focus:!border-error-400-500-token !bg-error-500/50 focus:!bg-error-500 dark:focus:!bg-error-400/30 dark:!bg-error-400 placeholder-error-500';
</script>

<div class="flex">
	<div class="flex items-center h-5">
		<input
			id={name}
			{name}
			aria-describedby={label}
			type="radio"
			{disabled}
			value={item?.[name] ?? ''}
			class="w-4 h-4 bg-surface-200-700-token border-surface-300-600-token {errorInput &&
				cInputError} ring-offset-surface-200 dark:ring-offset-surface-700"
		/>
		<div class="ml-2 text-sm">
			<label
				for={name}
				class="text-sm font-medium {required && cInputRequired} {errorInput
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
	</div>
</div>
