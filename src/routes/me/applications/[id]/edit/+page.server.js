import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import applicationSchema from '$lib/schemas/application';

export const load = async ({ locals, fetch, params }) => {
	if (!locals.user) throw redirect(307, '/login');

	// fetch application entry for the id
	const response = await fetch(
		`http://localhost:8080/applications/${params.id}`,
	);
	const data = await response.json();
	const form = await superValidate(data, applicationSchema);
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
			// params.id is application's id
			const response = await fetch(
				`http://localhost:8080/applications/${params.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						message: form.data.message,
					}),
				},
			);

			if (response.status === 401) {
				console.log("Unauthorized attempt to edit application");
				return fail(401, {
					form,
					message: "Cannot edit the application because user is not the author"
				})
			}

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
