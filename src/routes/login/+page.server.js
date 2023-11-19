import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  // if user has logged in, redirect to main page
  if (locals.user) throw redirect(307, "/");
};

export const actions = {
	default: async ({ cookies, request, fetch }) => {
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

    let success = false;
		try {
			const response = await fetch(tokenUrl, {
				method: 'POST',
				headers: headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
      const token = await response.text();
      cookies.set('jwt', token, { path: '/' });
      success = true;
    } catch (err) {
      console.error("error while signing in", err);
      success = false;
		}

    if (success) {
      throw redirect(307, '/');
    } else {
      return fail(401);
    }
	},
};
