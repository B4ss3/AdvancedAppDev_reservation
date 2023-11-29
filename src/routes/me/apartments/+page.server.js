import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	const apartmentDataResponse = await fetch(
		'http://localhost:8080/users/me/apartments',
	);
	const apartmentData = await apartmentDataResponse.json();

	const rentDataResponse = await fetch(
		'http://localhost:8080/users/me/renting_pay',
	);
	const rentData = await rentDataResponse.json();

	return { apartments: apartmentData, rent: rentData };
};
