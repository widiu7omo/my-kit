<script lang="ts">
	import type { ErrorInput } from './Input.svelte';

	export let label: string;
	export let name: string;
	export let item: Record<string, unknown> | null = null;
	export let errors: ErrorInput[] | null = null;

	$: errorInput = errors?.find((e) => e.path.includes(name));
	const cLabelInputError = 'text-error-500-400-token';
</script>

<div class="flex">
	<div class="flex items-center h-5">
		<input
			id={name}
			{name}
			aria-describedby={label}
			type="radio"
			value={item?.[name] ?? ''}
			class="w-4 h-4 bg-surface-200-700-token border-surface-300-600-token"
		/>
		<div class="ml-2 text-sm">
			<label
				for={name}
				class="text-sm font-medium {errorInput ? cLabelInputError : 'text-surface-600-300-token'}"
				>{label}</label
			>
			{#if errorInput}
				<p id="helper-{name}" class="!text-xs font-normal text-error-400-500-token">
					{errorInput.message}
				</p>
			{/if}
		</div>
	</div>
</div>
