import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import apartmentSchema from '$lib/schemas/apartment';

export const load = async ({ locals, fetch, params }) => {
	if (!locals.user) throw redirect(307, '/login');

	// fetch application entry for the id
	const response = await fetch(`http://localhost:8080/apartments/${params.id}`);
	// validate application data and populate edit form
	const data = await response.json();
	const form = await superValidate(data, apartmentSchema);
	return { form };
};

export const actions = {
	default: async ({ request, fetch, params }) => {
		const form = await superValidate(request, apartmentSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			const response = await fetch(
				`http://localhost:8080/apartments/${params.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						rentAmount: form.data.rentAmount,
						area: form.data.area,
						apartmentType: form.data.apartmentType,
						description: form.data.description,
						streetName: form.data.streetName,
						cityName: form.data.cityName,
						postalCode: form.data.postalCode,
						apartmentNumber: form.data.apartmentNumber,
						roomNormalCount: form.data.roomNormalCount,
						roomKitchenCount: form.data.roomKitchenCount,
						roomBalconyCount: form.data.roomBalconyCount,
						roomBathroomCount: form.data.roomBathroomCount,
					}),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return { form };
		} catch (err) {
			console.error('error while updating an apartment', err);
			return fail(500, {
				form,
			});
		}
	},
};
