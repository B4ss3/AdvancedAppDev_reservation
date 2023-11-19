import { fail } from '@sveltejs/kit';

export const load = async ({}) => {
	return { user: null };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const tokenUrl = 'http://localhost:8080/token';
		// Base64 encode credentials
		const credentials = `${username}:${password}`;
		const encodedCredentials = btoa(credentials);
		console.log({ username, password, encodedCredentials });

		const headers = new Headers();
		headers.append('Authorization', `Basic ${encodedCredentials}`);
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		try {
			const response = await fetch(tokenUrl, {
				method: 'POST',
				headers: headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const token = await response.text();
			return { status: 201, token };
		} catch (err) {
			console.error(err);
			return fail(401, { err });
		}
	},
};
