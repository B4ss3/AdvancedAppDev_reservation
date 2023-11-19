import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, cookies }) => {
  cookies.delete("jwt")
  throw redirect(307, "/");
};
