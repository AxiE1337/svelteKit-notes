import type { Actions, PageServerLoad } from './$types';
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

export const actions: Actions = {
	addNote: async (event) => {
		const form = await event.request.formData();
		const note = form.get('note');
		const session = (await event.locals.getSession()) as ISession | null;

		if (!session) {
			throw redirect(303, '/login');
		}

		const data = await xata.db.notes.create({
			uid: session.user.sub,
			text: note as string,
			updated_at: new Date()
		});
		return data;
	}
};
