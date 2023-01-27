<script lang="ts">
	import Fieldset from '$lib/components/commons/Fieldset.svelte';
	import Form from '$lib/components/commons/Form.svelte';
	import TextInput from '$lib/components/commons/inputs/TextInput.svelte';
	import AdminLayout from '$lib/layouts/AdminLayout.svelte';
	const item: Record<string, unknown> | null = null;
	let form: HTMLFormElement;
	let errors: { message: string; path: string[] }[] | null = null;
	let testError = `
	[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"null\",\n    \"path\": [\n      \"demo\"\n    ],\n    \"message\": \"Expected string, received null\"\n  }\n]
	`;
	const handleSave = (e: CustomEvent) => {
		errors = JSON.parse(testError);
		console.log(errors);
	};
	const handleCancel = () => {
		errors = null;
	};
</script>

<svelte:head>
	<title>Components</title>
</svelte:head>
<AdminLayout>
	<div class="p-8 mx-auto">
		<div class="grid grid-cols-4 gap-4">
			<Form on:save={handleSave} on:cancel={handleCancel} bind:form>
				<div slot="input">
					<Fieldset name="Input Text">
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
					<Fieldset name="Input Combobox">
						<TextInput
							label="Demo"
							name="demo"
							{item}
							{errors}
							required
							placeholder="Input demo value"
						/>
					</Fieldset>
					<Fieldset name="Input Radio">
						<TextInput
							label="Demo"
							name="demo"
							{item}
							{errors}
							required
							placeholder="Input demo value"
						/>
					</Fieldset>
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
