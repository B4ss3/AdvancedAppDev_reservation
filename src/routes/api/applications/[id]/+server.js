export const DELETE = async ({ fetch, locals, params }) => {
	const response = fetch(`http://localhost:8080/applications/${params.id}`, {
		method: 'DELETE',
	});

	return response;
};

export const POST = async ({ fetch, locals, params, url }) => {
	const applicationId = params.id;
	const statusQuery = url.searchParams.get('status');
	// cancel if status is not "decline" or "accept"
	if (statusQuery !== 'decline' && statusQuery !== 'accept') {
		return { status: 400, message: 'Invalid status type: ' + statusQuery };
	}

	const response = fetch(
		`http://localhost:8080/applications/${applicationId}?status=${statusQuery}`,
		{
			method: 'POST',
		},
	);

	return response;
};
