import type { Actions, PageServerLoad } from './$types';
import type { ISession } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { getXataClient } from '../xata';

const xata = getXataClient();

export const load: PageServerLoad = async (event) => {
	const session = (await event.locals.getSession()) as ISession | null;
	if (!session) {
		throw redirect(303, '/login');
	}

	const notes = await xata.db.notes.filter({ uid: session?.user.sub }).getAll();
	if (!notes) {
		throw error(404, 'Notes not found');
	}
	return { notes: notes };
};

export const actions: Actions = {
	addNote: async (event) => {
		const session = (await event.locals.getSession()) as ISession | null;
		if (!session) {
			throw redirect(303, '/login');
		}
		const form = await event.request.formData();
		const note = form.get('note') as string;

		await xata.db.notes.create({
			uid: session.user.sub,
			text: note as string,
			updated_at: new Date()
		});
		const notes = await xata.db.notes.filter({ uid: session?.user.sub }).getAll();
		return { notes };
	}
};
