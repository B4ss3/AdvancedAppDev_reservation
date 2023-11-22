import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const loginSchema = z.object({
	email: z.string().min(1),
	password: z.string().min(5),
});

export const load = async ({ locals }) => {
	// if user has logged in, redirect to main page
	if (locals.user) throw redirect(307, '/');

	const form = await superValidate(loginSchema);
	return { form };
};

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			const response = await fetch('http://localhost:8080/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: form.data.email,
					password: form.data.password,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const token = await response.text();
			cookies.set('jwt', token, { path: '/' });

			return { form };
		} catch (err) {
			console.error('error while signing in', err);
			return fail(500, {
				form,
			});
		}
	},
};
