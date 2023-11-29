import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import applicationSchema from '$lib/schemas/application';

export const load = async ({ locals, fetch, params }) => {
	if (!locals.user) throw redirect(307, '/login');



	const form = await superValidate(applicationSchema);
	return { form };
};
