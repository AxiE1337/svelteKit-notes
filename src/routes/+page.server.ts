import type { PageServerLoad } from './$types';
const notes = [{ id: 3214312, text: 'some dummy text', updatedAt: Date.now() }];

export const load: PageServerLoad = async () => {
	return {
		notes
	};
};
