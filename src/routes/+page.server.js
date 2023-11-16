export function load({ fetch }) {
    //const data = { id:id, name: "asd", street: "asd" }; //fetch(`/api/apartments/${params.id}`)
    let data = [
        {id: 1, name:"asd"},
        {id: 2, name:"123"},
    ];
	if (data) return { apartments: data, userData: "roope" }
    // throw error(404)
}   