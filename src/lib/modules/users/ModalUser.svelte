<script lang="ts">
	import type { RouterInputs } from '$lib/trpc/router';
	import Form from '$lib/components/commons/Form.svelte';
	import Fieldset from '$lib/components/commons/Fieldset.svelte';
	import TextInput from '$lib/components/commons/inputs/TextInput.svelte';
	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import { savable } from '$lib/saveable';
	import { trpc } from '$lib/trpc/client';
	import { invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { TRPCClientError } from '@trpc/client';
	import { getInvocationMessage, isJson } from '$lib/helpers/data';
	let item: RouterInputs['users']['save'] | null = null;
	let errors: { message: string; path: string[] }[] | null = null;
	let form: HTMLFormElement;
	let afterSave: () => void;
	let handleCancel: () => void;
	let afterDelete: () => void;
	let busy = false;
	let columns: string[] = [];
	$: {
		$modalStore[0]?.meta;
		item = $modalStore[0]?.meta['item'];
		afterSave = $modalStore[0]?.meta['fnAfterSave'];
		handleCancel = $modalStore[0]?.meta['fnOnCancel'];
		afterDelete = $modalStore[0]?.meta['fnAfterDelete'];
	}
	// Form Data
	const cleanUp = () => {
		item = null;
		errors = null;
 		form.reset();
	};
	const handleSave = async (e: CustomEvent) => {
		// if (!data.isAuthenticated) {
		//   needsAuthorization = true;
		//   return;
		// }
		busy = true;
		try {
			await trpc().users.save.mutate(savable<RouterInputs['users']['save']>(e.detail));
			await invalidateAll();
			if (e.detail.id) {
				toast.success('User updated');
			} else {
				toast.success('New user saved');
			}
			cleanUp();
			// Load data after save
			afterSave();
		} catch (err) {
			if (err instanceof TRPCClientError) {
				if (isJson(err.message)) {
					errors = JSON.parse(err.message);
				} else {
					toast.error(getInvocationMessage(err.message));
				}
			} else {
				throw err;
			}
		} finally {
			busy = false;
		}
	};
	// Base Classes
	const cBase = 'space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<div class={cBase}>
	<Form on:save={handleSave} on:cancel={handleCancel} bind:form>
		<div slot="input">
			<Fieldset name="Basic Information">
				<input type="hidden" name="id" value={item?.id ?? null} />
				<TextInput name="name" label="Name" required {errors} {item} />
				<TextInput name="email" label="E-mail" required {errors} {item} />
			</Fieldset>
		</div>
		<div slot="action" class="flex items-end justify-end">
			<button type="submit" class:loading={busy} class="btn variant-filled-primary btn-sm"
				>Save</button
			>
		</div>
	</Form>
</div>
