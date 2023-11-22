<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	export let data;

	onMount(() => {
		if (browser && data.success)
			goto('/', {
				invalidateAll: true,
			});
	});
</script>
