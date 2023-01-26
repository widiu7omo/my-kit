<script lang="ts">
	export let name: string;
	export let labelBg: string = 'bg-surface-100-800-token';
</script>

<div class="p-4 border border-surface-300-600-token rounded-lg relative">
	<h6 class="absolute top-[-12px] text-sm {labelBg} text-surface-600-300-token px-2">{name}</h6>
	<slot />
</div>
