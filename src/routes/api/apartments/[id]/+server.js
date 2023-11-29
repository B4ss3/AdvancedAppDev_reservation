export const DELETE = async ({ fetch, locals, params }) => {
	const response = fetch(`http://localhost:8080/apartments/${params.id}`, {
		method: 'DELETE',
	});

	return response;
};
