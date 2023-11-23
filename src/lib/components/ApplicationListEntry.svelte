<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import HumbleiconsHome from '~icons/humbleicons/home';
	import { goto } from '$app/navigation';
	import { constructAddress } from '$lib/constants';
	import { invalidate } from '$app/navigation';

	export let application;

	$: fullAddress = constructAddress(application.apartment);

	const handleEdit = async () => {
		if (confirm('Do you want to edit the application?')) {
			await goto(`/me/applications/${application.applicationId}/edit`);
		}
	};

	const handleDelete = async () => {
		if (confirm('Are you sure you want to delete the application?')) {
			const response = await fetch(
				`/api/applications/${application.applicationId}`,
				{
					method: 'DELETE',
				},
			);
			const { message, success } = await response.json();

			if (success) {
				console.log(message);

				invalidate('load:applications');
			}
		}
	};
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
				on:click={handleEdit}
			>
				<span>Edit</span>
			</button>
			<button
				type="button"
				class="btn variant-filled ml-auto"
				on:click={handleDelete}
			>
				<span>Delete</span>
			</button>
		</div>
	</svelte:fragment>
</AccordionItem>
