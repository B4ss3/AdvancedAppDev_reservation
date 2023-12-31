<script>
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import { HomeOutline } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	import { APPLICATION_STATUS, constructAddress } from '$lib/constants';
	import { invalidate } from '$app/navigation';

	export let application;
	// whether apartment is owned by the user
	// used to display accept / deny buttons
	export let owned = false;

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

	const handleAccept = async () => {
		const response = await fetch(
			`/api/applications/${application.applicationId}?status=accept`,
			{
				method: 'POST',
			},
		);
		const { message, success } = await response.json();
		if (success) {
			console.log(message);
			invalidate('load:applications');
		}
	};

	const handleDecline = async () => {
		const response = await fetch(
			`/api/applications/${application.applicationId}?status=decline`,
			{
				method: 'POST',
			},
		);
		const { message, success } = await response.json();
		if (success) {
			console.log(message);
			invalidate('load:applications');
		}
	};
</script>

<AccordionItem>
	<svelte:fragment slot="lead"><HomeOutline /></svelte:fragment>
	<svelte:fragment slot="summary">
		<h5 class="h5">
			{#if application.status === 'ACCEPTED'}
				<span class="badge variant-filled-success"
					>{APPLICATION_STATUS[application.status]}</span
				>
			{:else if application.status === 'DECLINED'}
				<span class="badge variant-filled-error"
					>{APPLICATION_STATUS[application.status]}</span
				>
			{:else}
				<span class="badge variant-filled"
					>{APPLICATION_STATUS[application.status]}</span
				>
			{/if}
			{fullAddress}
		</h5>
	</svelte:fragment>
	<svelte:fragment slot="content">
		{application.message}

		{#if application.status === 'PENDING'}
			<div class="w-full flex gap-1">
				{#if owned}
					<!-- buttons for accepting / declining applications for owned apartments -->
					<div class="space-taker w-full"></div>
					<button
						type="button"
						class="btn variant-filled ml-auto"
						on:click={handleAccept}
					>
						<span>Accept</span>
					</button>
					<button
						type="button"
						class="btn variant-filled ml-auto"
						on:click={handleDecline}
					>
						<span>Decline</span>
					</button>
				{:else}
					<!-- buttons for user's own applications -->
					<div class="space-taker w-full"></div>
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
				{/if}
			</div>
		{/if}
	</svelte:fragment>
</AccordionItem>
