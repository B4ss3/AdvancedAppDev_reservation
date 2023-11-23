<script>
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data;

	const { form, enhance, constraints } = superForm(data.form, {
		resetForm: true,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await goto('/', { invalidateAll: true });
			}
		},
		onError: async (event) => {
			console.error(event);
		},
	});
</script>

<SuperDebug data={form} />

<article class="max-w-lg m-auto">
	<header>
		<h3 class="h3 text-center mt-4">Application for the apartment</h3>
	</header>
	<form
		class="px-2 mb-2 flex flex-col"
		method="POST"
		use:enhance
	>
		<label class="label">
			<span>Application message </span>
			<p>
				Tell about yourself what ever you want inform if have animals of any
				sort and other lies you want to tell
			</p>
			<textarea
				type="text"
				class="input"
				name="applicationMessage"
				cols="30"
				rows="5"
				bind:value={$form.applicationMessage}
			></textarea>
		</label>
		<button
			class="btn variant-filled mt-2"
			type="submit">Submit</button
		>
	</form>
</article>
