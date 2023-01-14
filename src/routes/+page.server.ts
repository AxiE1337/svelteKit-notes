import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getXataClient } from '../xata';

interface ISession {
	user: {
		name: string;
		email: string;
		image: string;
		sub: string;
	};
	expires: number;
}

const xata = getXataClient();

export const load: PageServerLoad = async (event) => {
	const session = (await event.locals.getSession()) as ISession | null;
	const notes = await xata.db.notes.filter({ uid: session?.user.sub }).getAll();

	if (!session) {
		throw redirect(303, '/login');
	}
	if (!notes) {
		throw error(404, 'Notes not found');
	}

	return {
		notes
	};
};
