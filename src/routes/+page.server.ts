import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const notes = [{ id: 3214312, text: 'some dummy text\nafw', updatedAt: Date.now() }];

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(303, '/login');
	}

	return {
		notes
	};
};
