import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const loginSchema = z.object({
	/* email: z.string().min(1), */
	username: z.string().min(1),
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
		console.log(form.data);
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const tokenUrl = 'http://localhost:8080/auth/login';

		let success = false;
		try {
			const response = await fetch(tokenUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: form.data.username,
					password: form.data.password,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const token = await response.text();
			console.log({ token });
			cookies.set('jwt', token, { path: '/' });
			success = true;
		} catch (err) {
			console.error('error while signing in', err);
			success = false;
		}

		if (success) {
			throw redirect(307, '/');
		} else {
			return fail(401);
		}
	},
};
