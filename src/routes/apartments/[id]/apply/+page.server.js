import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import applicationSchema from '$lib/schemas/application';

export const load = async ({ locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	const form = await superValidate(applicationSchema);
	return { form };
};

export const actions = {
	default: async ({ params, request, fetch }) => {
		const form = await superValidate(request, applicationSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			const response = await fetch('http://localhost:8080/applications', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: form.data.message,
					apartmentId: params.id,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return { form };
		} catch (err) {
			console.error('error while creating application', err);
			return fail(500, {
				form,
			});
		}
	},
};
