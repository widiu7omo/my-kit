<script lang="ts">
	import Fieldset from '$lib/components/commons/Fieldset.svelte';
	import Form from '$lib/components/commons/Form.svelte';
	import Checkbox from '$lib/components/commons/inputs/Checkbox.svelte';
	import Radiobox from '$lib/components/commons/inputs/Radiobox.svelte';
	import TextInput from '$lib/components/commons/inputs/TextInput.svelte';
	import AdminLayout from '$lib/layouts/AdminLayout.svelte';
	import { onMount } from 'svelte';
	let item: Record<string, unknown> | null = null;
	let form: HTMLFormElement;
	let errors: { message: string; path: string[] }[] | null = null;
	let testError = `
	[{"code":"invalid_type","expected":"string","received":"null","path":["demo"],"message":"Expected string, received null"},{"code":"invalid_type","expected":"string","received":"null","path":["demoCheckbox"],"message":"Expected string, received null"},{"code":"invalid_type","expected":"string","received":"null","path":["demoRadio"],"message":"Expected string, received null"},{"code":"invalid_type","expected":"string","received":"null","path":["demoTextArea"],"message":"Expected string, received null"},{"code":"invalid_type","expected":"string","received":"null","path":["demoSelect"],"message":"Expected string, received null"}]
	`;
	const handleSave = (e: CustomEvent) => {
		errors = JSON.parse(testError);
		console.log(errors);
	};
	const handleCancel = () => {
		errors = null;
	};
	onMount(() => {
		item = {
			demoCheckbox: '',
			demo: '',
			demoRadio: '',
			demoTextArea: '',
			demoSelect: ''
		};
	});
</script>

<svelte:head>
	<title>Components</title>
</svelte:head>
<AdminLayout>
	<div class="p-8 mx-auto">
		<div class="grid grid-cols-4 gap-4">
			<Form on:save={handleSave} on:cancel={handleCancel} bind:form>
				<div slot="input">
					<Fieldset name="Input Text Field">
						<TextInput
							label="Demo"
							name="demo"
							{item}
							{errors}
							required
							helpText="Please fill this demo"
							placeholder="Input demo value"
						/>
					</Fieldset>
				</div>
				<div slot="action" class="flex items-end justify-end">
					<button type="submit" class="btn variant-filled-primary btn-sm">Save</button>
				</div>
			</Form>
			<Form on:save={handleSave} on:cancel={handleCancel} bind:form>
				<div slot="input">
					<Fieldset name="Input Checkbox">
						<Checkbox label="Demo Checkbox" {item} {errors} name="demoCheckbox" />
					</Fieldset>
				</div>
				<div slot="action" class="flex items-end justify-end">
					<button type="submit" class="btn variant-filled-primary btn-sm">Save</button>
				</div>
			</Form>
			<Form on:save={handleSave} on:cancel={handleCancel} bind:form>
				<div slot="input">
					<Fieldset name="Input Radio">
						<Radiobox label="Demo Radiobox" {item} {errors} name="demoRadio" />
					</Fieldset>
				</div>
				<div slot="action" class="flex items-end justify-end">
					<button type="submit" class="btn variant-filled-primary btn-sm">Save</button>
				</div>
			</Form>
			<Form on:save={handleSave} on:cancel={handleCancel} bind:form>
				<div slot="input">
					<Fieldset name="Input Select">
						<TextInput
							label="Demo"
							name="demo"
							{item}
							{errors}
							required
							placeholder="Input demo value"
						/>
					</Fieldset>
				</div>
				<div slot="action" class="flex items-end justify-end">
					<button type="submit" class="btn variant-filled-primary btn-sm">Save</button>
				</div>
			</Form>
		</div>
	</div>
</AdminLayout>
