import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server';

const newUserSchema = z.object({
	firstName: z.string().min(1),
	lastname: z.string().min(1),
	email: z.string().min(1),
	username: z.string().min(1),
	password: z.string().min(1)
})

export const load = async ({ locals }) => {
	// if user has logged in, redirect to main page
	if (locals.user) throw redirect(307, '/');
};

export const actions = {
	login: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const tokenUrl = 'http://localhost:8080/auth/login';

		let success = false;
		try {
			const response = await fetch(tokenUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
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
