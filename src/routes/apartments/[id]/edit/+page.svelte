<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { APARTMENT_TYPES } from '$lib/constants';

	export let data;

	const { form, enhance, constraints } = superForm(data.form, {
		resetForm: true,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await goto('/', { invalidateAll: true });
			} else {
				console.error(result.data.message);
			}
		},
		onError: async (event) => {
			console.error(event.result.error.message);
		},
	});

	const deleteApartment = async () => {
		const confirmDelete = confirm(
			'Are you sure you want to delete this apartment?',
		);

		if (confirmDelete) {
			try {
				const response = await fetch(`/api/apartments/${$page.params.id}`, {
					method: 'DELETE',
				});
				const result = await response.json();

				await goto('/', { invalidateAll: true });
			} catch (error) {
				console.error('Error deleting apartment:', error);
			}
		}
	};
</script>

<!-- <SuperDebug data={form} /> -->

<svelte:head>
	<title>Create apartment</title>
</svelte:head>

<article class="max-w-lg m-auto">
	<header>
		<h3 class="h3 text-center mt-4">Edit House Listing</h3>
	</header>
	<form
		class="px-2 mb-2 flex flex-col"
		method="POST"
		use:enhance
	>
		<label class="label">
			<span>Street</span>
			<input
				class="input"
				type="text"
				name="streetName"
				bind:value={$form.streetName}
				{...$constraints.streetName}
			/>
		</label>

		<div class="flex flex-row gap-3">
			<label class="label">
				<span>City</span>
				<input
					class="input"
					type="text"
					name="cityName"
					bind:value={$form.cityName}
					{...$constraints.cityName}
				/>
			</label>
			<label class="label">
				<span>Apartment number</span>
				<input
					class="input"
					type="text"
					name="apartmentNumber"
					bind:value={$form.apartmentNumber}
					{...$constraints.apartmentNumber}
				/>
			</label>
		</div>
		<label class="label">
			<span>Postal code</span>
			<input
				class="input"
				type="text"
				name="postalCode"
				bind:value={$form.postalCode}
				{...$constraints.postalCode}
			/>
		</label>

		<h4 class="h4 text-center mt-4">Apartment details</h4>
		<div class="flex flex-row gap-3">
			<label class="label">
				<span>Apartment type</span>
				<select
					class="input"
					type="text"
					name="apartmentType"
					bind:value={$form.apartmentType}
					{...$constraints.apartmentType}
				>
					{#each Object.entries(APARTMENT_TYPES) as [key, value]}
						<option value={key}>{value}</option>
					{/each}
				</select>
			</label>
			<label class="label">
				<span>Area in squares</span>
				<input
					class="input"
					type="number"
					name="area"
					step="0.1"
					bind:value={$form.area}
					{...$constraints.area}
				/>
			</label>
			<label class="label">
				<span>Rent, €</span>
				<input
					class="input"
					type="number"
					name="rentAmount"
					step="0.1"
					bind:value={$form.rentAmount}
					{...$constraints.rentAmount}
				/>
			</label>
		</div>
		<div class="flex flex-row gap-3">
			<label class="label">
				<span>General rooms</span>
				<input
					class="input"
					type="number"
					name="roomNormalCount"
					bind:value={$form.roomNormalCount}
					{...$constraints.roomNormalCount}
				/>
			</label>
			<label class="label">
				<span>Kitchens</span>
				<input
					class="input"
					type="number"
					name="roomKitchenCount"
					bind:value={$form.roomKitchenCount}
					{...$constraints.roomKitchenCount}
				/>
			</label>
			<label class="label">
				<span>Balconies</span>
				<input
					class="input"
					type="number"
					name="roomBalconyCount"
					bind:value={$form.roomBalconyCount}
					{...$constraints.roomBalconyCount}
				/>
			</label>
			<label class="label">
				<span>Bathrooms</span>
				<input
					class="input"
					type="number"
					name="roomBathroomCount"
					bind:value={$form.roomBathroomCount}
					{...$constraints.roomBathroomCount}
				/>
			</label>
		</div>
		<h4 class="h4 text-center mt-4">General</h4>
		<label class="label">
			<span>Description</span>
			<textarea
				class="input"
				name="description"
				cols="30"
				rows="5"
				bind:value={$form.description}
				{...$constraints.description}
			></textarea>
		</label>

		<button
			class="btn variant-filled mt-2"
			type="submit">Submit</button
		>
	</form>
	<button
		class="btn variant-filled mt-2"
		on:click={deleteApartment}>Delete</button
	>
</article>
