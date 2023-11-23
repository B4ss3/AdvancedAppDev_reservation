import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const createApllicationSchema = z.object({
	applicationMessage: z.string().min(1),
});

export const load = async ({ locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	const form = await superValidate(createApllicationSchema);
	return { form };
};

export const actions = {
	default: async ({ params, request, fetch }) => {
		const form = await superValidate(request, createApllicationSchema);

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
					message: form.data.applicationMessage,
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
