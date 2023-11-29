<script>
	import { Accordion } from '@skeletonlabs/skeleton';
	import ApplicationListEntry from '$lib/components/ApplicationListEntry.svelte';
	export let data;

	let userSentApplications = [];
	let applicationsForUserApartments = [];

	const applyLoad = (data) => {
		if (!data) return;

		if (data.userSentApplications)
			userSentApplications = data.userSentApplications;
		if (data.applicationsForUserApartments)
			applicationsForUserApartments = data.applicationsForUserApartments;
	};
	// trigger invalidation
	$: applyLoad(data.data);
</script>

<svelte:head>
    <title>My Applications</title> 
</svelte:head>

<section class="mt-5">
	<h3 class="h3 font-bold">Sent applications</h3>
	<Accordion>
		{#each userSentApplications as application}
			<ApplicationListEntry {application}></ApplicationListEntry>
		{:else}
			No applications
		{/each}
	</Accordion>
</section>

<section class="mt-5">
	<h3 class="h3 font-bold">Applications for apartments</h3>
	<Accordion>
		{#each applicationsForUserApartments as application}
			<ApplicationListEntry
				{application}
				owned={true}
			></ApplicationListEntry>
		{:else}
			No applications
		{/each}
	</Accordion>
</section>
