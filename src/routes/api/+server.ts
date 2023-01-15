import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getXataClient } from '../../xata';

const xata = getXataClient();

export const PATCH: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'unauthorized ');
	}

	const data = await request.json();

	const note = await xata.db.notes.read(data.noteId);
	const updatedNote = await note?.update({ text: data.noteText });

	return new Response(JSON.stringify({ note: updatedNote }));
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'unauthorized ');
	}
	const id = await request.json();

	await xata.db.notes.delete(id);
	return new Response();
};

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, 'unauthorized ');
	}
	return new Response(JSON.stringify({ text: 'hello' }));
};
