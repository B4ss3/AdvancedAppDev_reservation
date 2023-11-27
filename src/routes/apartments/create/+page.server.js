import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { APARTMENT_TYPES } from '$lib/constants';

const createApartmentSchema = z.object({
	rentAmount: z.number(),
	area: z.number(),
	apartmentType: z.enum(Object.keys(APARTMENT_TYPES)),
	description: z.string().default(''),
	streetName: z.string().max(45),
	cityName: z.string().max(45),
	postalCode: z.string().max(10),
	apartmentNumber: z.string().max(10),
	roomNormalCount: z.number().int().max(10),
	roomKitchenCount: z.number().int().max(10),
	roomBalconyCount: z.number().int().max(10),
	roomBathroomCount: z.number().int().max(10),
});

export const load = async ({ locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	const form = await superValidate(createApartmentSchema);
	return { form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, createApartmentSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			const response = await fetch('http://localhost:8080/apartments', {
				method: 'POST',
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
					apartmentNmber: form.data.apartmentNmber,
					roomNormalCount: form.data.roomNormalCount,
					roomKitchenCount: form.data.roomKitchenCount,
					roomBalconyCount: form.data.roomBalconyCount,
					roomBathroomCount: form.data.roomBathroomCount,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return { form };
		} catch (err) {
			console.error('error while submiting a apartment', err);
			return fail(500, {
				form,
			});
		}
	},
};
