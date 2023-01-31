<script lang="ts">
    import logo from "$lib/assets/images/logo.svg"
    import logoDark from "$lib/assets/images/logo-dark.svg"
    import {storeLightSwitch} from "@skeletonlabs/skeleton";
</script>

<div class="p-4 pt-3 font-bold text-lg">
    <span><img src={$storeLightSwitch?logoDark:logo} alt="Logo" class="h-12"></span>
</div>
