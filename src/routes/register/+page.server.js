import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const newUserSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().min(1),
	userName: z.string().min(1),
	password: z.string().min(6),
});

export const load = async ({ locals, event }) => {
	// if user has logged in, redirect to main page
	if (locals.user) throw redirect(307, '/');

	const form = await superValidate(event, newUserSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, newUserSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		return { form };
	},
};
