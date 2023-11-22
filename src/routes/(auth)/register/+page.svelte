<script>
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data;

	const { form, constraints, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await goto('/login', { invalidateAll: true });
			} else {
				console.error(result.error);
			}
		},
	});
</script>

<!-- <SuperDebug data={form} /> -->

<article class="max-w-md m-auto">
	<header>
		<h3 class="h3 text-center">Register a new user</h3>
	</header>
	<form
		class="px-2 mb-2 flex flex-col"
		method="POST"
		use:enhance
	>
		<label class="label">
			<span>First name</span>
			<input
				class="input"
				type="text"
				name="firstName"
				bind:value={$form.firstName}
				{...$constraints.firstName}
			/>
		</label>

		<label class="label">
			<span>Last name</span>
			<input
				class="input"
				type="text"
				name="lastName"
				bind:value={$form.lastName}
				{...$constraints.lastName}
			/>
		</label>

		<label class="label">
			<span>Email</span>
			<input
				class="input"
				type="email"
				name="email"
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>

		<label class="label">
			<span>Password</span>
			<input
				class="input"
				type="password"
				name="password"
				bind:value={$form.password}
				{...$constraints.password}
			/>
		</label>
		<button
			class="btn variant-filled mt-2"
			type="submit">Register</button
		>
	</form>
</article>
