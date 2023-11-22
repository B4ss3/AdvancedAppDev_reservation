export const load = async ({ fetch }) => {
	const respone = await fetch('http://localhost:8080/apartments');
	const data = await respone.json();

	return { apartments: data };
};
