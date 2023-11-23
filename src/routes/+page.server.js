export const load = async ({ fetch }) => {
	const response = await fetch('http://localhost:8080/apartments');
	const data = await response.json();

	return { apartments: data };
};
