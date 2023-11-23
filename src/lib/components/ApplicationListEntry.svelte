<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import HumbleiconsHome from '~icons/humbleicons/home';
	import { goto } from '$app/navigation';
	import { constructAddress } from '$lib/constants';

	export let application;

	$: fullAddress = constructAddress(application.apartment);
</script>

<AccordionItem>
	<svelte:fragment slot="lead"><HumbleiconsHome /></svelte:fragment>
	<svelte:fragment slot="summary">
		<h5 class="h5">{fullAddress}</h5>
	</svelte:fragment>
	<svelte:fragment slot="content">
		{application.message}

		<div class="w-full flex gap-1">
			<div class="w-full"></div>
			<button
				type="button"
				class="btn variant-filled ml-auto"
				on:click={async () => await goto(`/`)}
			>
				<span>Edit</span>
			</button>
			<button
				type="button"
				class="btn variant-filled ml-auto"
				on:click={async () => await goto(`/`)}
			>
				<span>Delete</span>
			</button>
		</div>
	</svelte:fragment>
</AccordionItem>
