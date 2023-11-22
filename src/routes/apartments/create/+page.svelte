<script>
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data;

	const { form, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await goto('/', { invalidateAll: true });
			} else {
				console.error(result.error);
			}
		},
	});
</script>

<!-- <SuperDebug data={form} /> -->

<article class="max-w-md m-auto">
	<header>
		<h3 class="h3 text-center mt-4">Add new apartment</h3>
	</header>
	<h4 class="h4 text-center">Address</h4>
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
				/>
			</label>
			<label class="label">
				<span>Apartment number</span>
				<input
					class="input"
					type="text"
					name="apartmentNumber"
					bind:value={$form.apartmentNumber}
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
				>
					<option value="ONE_ROOM_FLAT">One room flat</option>
					<option value="TWO_ROOM_FLAT">Two room flat</option>
				</select>
			</label>
			<label class="label">
				<span>Area in spuares</span>
				<input
					class="input"
					type="number"
					name="area"
					bind:value={$form.area}
				/>
			</label>
			<label class="label">
				<span>Rent, €</span>
				<input
					class="input"
					type="number"
					name="rentAmount"
					bind:value={$form.rentAmount}
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
				/>
			</label>
			<label class="label">
				<span>Kitchens</span>
				<input
					class="input"
					type="number"
					name="roomKitchenCount"
					bind:value={$form.roomKitchenCount}
				/>
			</label>
			<label class="label">
				<span>Balconies</span>
				<input
					class="input"
					type="number"
					name="roomBalconyCount"
					bind:value={$form.roomBalconyCount}
				/>
			</label>
			<label class="label">
				<span>Bathrooms</span>
				<input
					class="input"
					type="number"
					name="roomBathroomCount"
					bind:value={$form.roomBathroomCount}
				/>
			</label>
		</div>

		<button
			class="btn variant-filled mt-2"
			type="submit">Submit</button
		>
	</form>
</article>
