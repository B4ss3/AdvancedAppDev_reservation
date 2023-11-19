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
