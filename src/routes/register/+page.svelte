<script>
	export let data;
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const { form, errors, constraints } = superForm(data.form);
</script>

<SuperDebug data={form} />

<article class=" max-w-md m-auto">
	<header>
		<h1 class="text-center">Register as new user</h1>
	</header>
	<form
		class="px-2 mb-2 border-2 flex flex-col"
		method="POST"
	>
		<label for="firstName">First name</label>
		<input
			type="text"
			id="firstName"
			name="firstName"
			placeholder="First name"
			bind:value={$form.firstName}
			{...constraints.firstName}
		/>
		{#if $errors.firstName}
			<small>{$errors.firstName}</small>
		{/if}
		<label for="lastName">Last name</label>
		<input
			type="text"
			id="lastName"
			name="lastName"
			placeholder="Last name"
			bind:value={$form.lastName}
			{...constraints.lastName}
		/>
		{#if $errors.lastName}
			<small>{$errors.lastName}</small>
		{/if}
		<label for="email">Email</label>
		<input
			type="email"
			id="email"
			name="email"
			placeholder="email"
			bind:value={$form.email}
			{...constraints.email}
		/>
		{#if $errors.email}
			<small>{$errors.email}</small>
		{/if}
		<label for="password">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={$form.password}
			{...constraints.password}
		/>
		<button
			class="flex 1 m-auto border-2 rounded"
			type="submit">Register</button
		>
	</form>
</article>
