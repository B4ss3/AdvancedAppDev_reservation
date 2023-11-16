export function load({ params, fetch }) {
	console.log(params);

	const data = { id: params.id, name: 'asd', street: 'asd' }; //fetch(`/api/apartments/${params.id}`)
	if (data) return { data };
	// throw error(404)
}
