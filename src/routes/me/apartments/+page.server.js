export const load = async ({ fetch }) => {
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
