<script>
	export let data;
</script>

<section>
	<span>Sent applications</span>
	<p>{JSON.stringify(data.allApplications.userSentApplications)}</p>
</section>
<section>
	<span>Applications for apartments</span>
	<p>{JSON.stringify(data.allApplications.applicationsForUserAppartments)}</p>
</section>
