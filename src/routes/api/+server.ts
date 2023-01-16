import type { RequestHandler } from './$types';
import type { ISession } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { getXataClient } from '../../xata';

const xata = getXataClient();

export const PATCH: RequestHandler = async ({ locals, request }) => {
	const session = (await locals.getSession()) as ISession | null;
	if (!session) {
		throw error(401, 'unauthorized ');
	}

	const data = await request.json();

	//delete if noteText is empty
	if (data.noteText.length < 1) {
		await xata.db.notes.delete(data.noteId);
		const updatedNotes = await xata.db.notes.filter({ uid: session?.user.sub }).getAll();

		return new Response(JSON.stringify({ notes: updatedNotes }));
	}

	//update if note
	await xata.db.notes?.update(data.noteId, { text: data.noteText });
	const updatedNotes = await xata.db.notes.filter({ uid: session?.user.sub }).getAll();

	return new Response(JSON.stringify({ notes: updatedNotes }));
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const session = (await locals.getSession()) as ISession | null;
	if (!session) {
		throw error(401, 'unauthorized ');
	}
	const id = await request.json();

	await xata.db.notes.delete(id);
	const updatedNotes = await xata.db.notes.filter({ uid: session?.user.sub }).getAll();
	return new Response(JSON.stringify({ notes: updatedNotes }));
};
