<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let form: HTMLFormElement;
	export type T = $$Generic;
	export let arrayFields: string[] | undefined = undefined;
	const dispatch = createEventDispatcher<{ cancel: never; save: T }>();
	const handleCancel = () => {
		dispatch('cancel');
	};
	const handleSave = (e: { currentTarget: HTMLFormElement }) => {
		const formData = new FormData(e.currentTarget);
		const data: Record<string, unknown> = {};
		if (arrayFields) {
			for (const key of arrayFields) {
				data[key] = [];
			}
		}
		for (let field of formData) {
			const [key, value] = field;
			if (arrayFields?.includes(key)) {
				(data[key] as unknown[]).push(value);
			} else {
				data[key] = value;
			}
		}
		dispatch('save', data as T);
	};
</script>

<form on:submit|preventDefault={handleSave} on:cancel={handleCancel} bind:this={form}>
	<div>
		<slot name="input" />
	</div>
	<div class="mt-4">
		<slot name="action" />
	</div>
</form>
