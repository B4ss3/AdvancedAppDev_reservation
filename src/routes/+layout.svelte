<script>
	import '../app.postcss';

	export let data;
</script>

<nav>
	<a href="/">Home</a>
	<a href="/inbox">Inbox</a>
	<a href="/my-applications">My applications</a>
	{#if data.user}
		<a href="/logout">Logout</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
</nav>

{#if data.user}
	<h1>Hi, {data.user.sub}</h1>
{/if}

<slot />

<style>
	h1 {
		font-size: 24px;
		font-weight: bold;
	}
</style>
