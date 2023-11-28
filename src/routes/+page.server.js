export const load = async ({ fetch }) => {
	try {
		const response = await fetch('http://localhost:8080/apartments');
		const data = await response.json();
		return { apartments: data };
	} catch (e) {
		console.error(e);
		return { apartments: [] };
	}
};
