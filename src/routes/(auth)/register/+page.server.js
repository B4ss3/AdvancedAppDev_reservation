import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const newUserSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email().min(4),
	password: z.string().min(5),
});

export const load = async ({ locals }) => {
	// if user has logged in, redirect to main page
	if (locals.user) throw redirect(307, '/');

	const form = await superValidate(newUserSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, newUserSchema);
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			const response = await fetch('http://localhost:8080/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					email: form.data.email,
					password: form.data.password,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			return { form };
		} catch (err) {
			console.error('error while registering user', err);
			return fail(500, {
				form,
			});
		}
	},
};
