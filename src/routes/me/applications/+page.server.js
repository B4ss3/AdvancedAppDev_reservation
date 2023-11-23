import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	const response = await fetch('http://localhost:8080/users/me/applications');
	const allApplications = await response.json();

	return { data: allApplications.data };
};
