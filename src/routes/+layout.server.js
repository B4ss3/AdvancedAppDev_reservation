export const load = async ({ locals }) => {
	// pass user data to the layout and pages
	return { user: locals.user };
};
