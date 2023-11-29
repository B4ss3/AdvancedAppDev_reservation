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
