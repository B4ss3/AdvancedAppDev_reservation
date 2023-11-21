<script>
	export let data;
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const { form, errors, constraints } = superForm(data.form);
</script>

<SuperDebug data={form} />

<article>
	<header>
		<h1>Register as new user</h1>
	</header>
	<form method="POST">
		<label for="firstName">First name</label>
		<input
			type="text"
			id="firstName"
			name="firstName"
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
			bind:value={$form.email}
            {...constraints.email}
		/>
		{#if $errors.email}
			<small>{$errors.email}</small>
		{/if}
		<label for="userName">Username</label>
		<input
			type="text"
			id="userName"
			name="userName"
			bind:value={$form.userName}
		/>
		{#if $errors.userName}
			<small>{$errors.userName}</small>
		{/if}
		<label for="password">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={$form.password}
            {...constraints.password}
		/>
		<button type="submit">Register</button>
	</form>
</article>
