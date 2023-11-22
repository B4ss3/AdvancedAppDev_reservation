import { decodeJwt } from 'jose';

export async function handle({ event, resolve }) {
	const jwt = event.cookies.get('jwt');

	let user = null;
	try {
		if (jwt) {
			// if jwt token has been saved into cookies, attempt extracting user information from it
			// const _secret = new TextEncoder().encode(secret);
			const decoded = await decodeJwt(jwt);
			// console.log({decoded});
			user = decoded;
		}
	} catch (err) {
		console.error(err);
		user = null;
	} finally {
		event.locals.user = user;
		return resolve(event);
	}
}

export async function handleFetch({ event, request, fetch }) {
	// if process.env.API_ENDPOINT is defined, project is being run in docker container
	// this means that using the normal localhost:8080 does not work
	// therefore we change the host to the name of the backend service, saved in API_ENDPOINT
	if (
		request.url.startsWith('http://localhost:8080/') &&
		process.env?.API_ENDPOINT
	) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('http://localhost:8080/', process.env.API_ENDPOINT),
			request,
		);
	}

	const jwtCookie = event.request.headers
		.get('cookie')
		?.split('; ')
		.find((cookie) => cookie.startsWith('jwt='));

	if (jwtCookie) {
		const jwtToken = jwtCookie.split('=')[1];
		request.headers.set('Authorization', `Bearer ${jwtToken}`);
	}

	return fetch(request);

	return fetch(request);
}
