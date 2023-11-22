export const load = async ({ locals, cookies }) => {
	cookies.delete('jwt');
	return { success: true };
};
