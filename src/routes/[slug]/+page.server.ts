import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (!params.slug) {
		throw error(404, 'Not found');
	}
	return {
		params: params
	};
};
