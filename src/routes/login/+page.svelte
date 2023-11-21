<script>
	export let data;
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const { form } = superForm(data.form);
</script>

<SuperDebug data={form} />

<article class=" max-w-md m-auto">
	<header>
		<h1 class="text-center">Login please</h1>
	</header>
	<form
		class="px-2 mb-2 border-2 flex flex-col"
		method="POST"
	>
		<label for="username">Username</label>
		<input
			type="text"
			id="username"
			name="username"
			bind:value={$form.username}
		/>
		<label for="password">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={$form.password}
		/>
		<button type="submit">Login</button>
		<a
			class="text-center"
			href="/register">Register</a
		>
	</form>
</article>
