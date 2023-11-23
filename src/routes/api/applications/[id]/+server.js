export const DELETE = async ({ fetch, locals, params }) => {
	const response = fetch(`http://localhost:8080/applications/${params.id}`, {
		method: 'DELETE',
	});

	return response;
};
