<script>
	import { Accordion } from '@skeletonlabs/skeleton';
	import ApplicationListEntry from '$lib/components/ApplicationListEntry.svelte';
	export let data;
	console.log(data);

	const { userSentApplications = [], applicationsForUserAppartments = [] } =
		data.data;
</script>

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
		{#each applicationsForUserAppartments as application}
			<ApplicationListEntry {application}></ApplicationListEntry>
		{:else}
			No applications
		{/each}
	</Accordion>
</section>
