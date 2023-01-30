<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import type { User } from '@prisma/client';
	import AdminLayout from '$lib/layouts/AdminLayout.svelte';
	import type { RouterInputs, RouterOutputs } from '$lib/trpc/router';
	import { invalidateAll } from '$app/navigation';
	import { TRPCClientError } from '@trpc/client';
	import toast from 'svelte-french-toast';
	import { getInvocationMessage, isJson } from '$lib/helpers/data';
	import { writable, type Writable } from 'svelte/store';
	import Table, {
		type ColumnTable,
		type ParamsQuery
	} from '$lib/components/commons/table/Table.svelte';
	import type { CustomEventProps } from '$lib/components/commons/table/TableActions.svelte';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import ModalUser from '$lib/modules/users/ModalUser.svelte';
	let params: ParamsQuery = {};
	export let data: {
		users: RouterOutputs['users']['list'];
		count: RouterOutputs['users']['count'];
	};
	let loading = false;
	let busy = false;
	const dataTable = writable(data.users);
	let count = data.count;
	const loadData = async () => {
		loading = true;
		$dataTable = await trpc($page).users.list.query({
			query: params.query,
			limit: params.limit,
			offset: params.offset
		});
		count = await trpc($page).users.count.query({
			query: params.query
		});
		loading = false;
	};
	const columns: ColumnTable<User>[] = [
		{
			header: 'ID',
			accessor: 'id',
			sortable: false,
			width: 100,
			filterable: false
		},
		{ header: 'Name', accessor: 'name', width: 300 },
		{ header: 'E-mail', accessor: 'email' },
		{ header: 'Provider', accessor: 'provider_id' },
		{ header: 'Password', accessor: 'hashed_password' }
	];

	const handleModalAddOpen = () => {
		const component: ModalComponent = { ref: ModalUser };
		const setting: ModalSettings = {
			modalClasses: '!max-w-[500px] !bg-surface-50-900-token',
			type: 'component',
			title: 'Create new user',
			component,
			response(r: boolean) {
				if (r) console.log('response:', r);
			},
			meta: {
				item: {
					id: null,
					name: '',
					email: ''
				},
				fnAfterSave: () => {
					loadData();
					console.log('AFTER SAVE');
					if (browser) {
						modalStore.close();
						modalStore.clear();
					}
				},
				fnOnCancel: () => console.log('AFTER CANCEL')
			}
		};
		if (browser) modalStore.trigger(setting);
	};
	const handleModalEditOpen = async (e: CustomEvent<CustomEventProps>) => {
		if (e.detail.id) {
			const indexRow = parseInt(e.detail.id);
			const component: ModalComponent = { ref: ModalUser };
			const setting: ModalSettings = {
				type: 'component',
				title: 'Edit User',
				body: 'Edit user data below',
				component,
				response(r: boolean) {
					if (r) console.log('response:', r);
				},
				meta: {
					item: $dataTable[indexRow],
					fnAfterSave: () => {
						loadData();
						if (browser) {
							modalStore.close();
							modalStore.clear();
						}
					},
					fnOnCancel: () => console.log('AFTER CANCEL')
				}
			};
			if (browser) modalStore.trigger(setting);
		} else {
			toast.error('User not found');
		}
	};
	let item: RouterInputs['users']['save'] | null = null;
	let errors: { message: string; path: string[] }[] | null = null;
	const handleDelete = async (e: CustomEvent<CustomEventProps>) => {
		busy = true;
		try {
			if (e.detail.id) {
				const rowIndex = parseInt(e.detail.id);
				const id = $dataTable[rowIndex].id;
				await trpc().users.delete.mutate(id);
				await invalidateAll();
				toast.success('User Deleted');
				// cleanUp();
				loadData();
			} else {
				toast.error('User not found');
			}
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
	const handleLoadData = (e: CustomEvent<ParamsQuery>) => {
		loadData();
	};
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>
<AdminLayout>
	<div class="px-2 xl:px-16">
		<div class="flex justify-between py-8 items-center">
			<div>
				<h4 class="text-2xl font-bold">Users</h4>
				<h6 class="text-stone-500 font-light text-sm">Management users</h6>
			</div>
			<button class="btn variant-filled-primary btn-sm" on:click={handleModalAddOpen}
				>New User</button
			>
		</div>
		<Table
			class="max-w-screen xl:max-w-6xl"
			{dataTable}
			{columns}
			bind:count
			bind:loading
			bind:params
			on:delete={handleDelete}
			on:edit={handleModalEditOpen}
			on:load={handleLoadData}
			on:rowClick={handleModalEditOpen}
		/>
	</div>
</AdminLayout>
