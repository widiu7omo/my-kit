<script lang="ts">
    import AdminLayout from '$lib/layouts/AdminLayout.svelte';
    import {t} from "$lib/i18n/generated/index.js";
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<AdminLayout>
    <h4>{$t.page.admin.dashboard.title}</h4>
</AdminLayout>
