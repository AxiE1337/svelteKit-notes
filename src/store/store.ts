import { writable } from 'svelte/store';
import type { INote, Theme } from '$lib/types';

export const notesStore = writable<INote[]>([]);

export const setTheme = (theme?: Theme) => {
	if (!theme) {
		const getTheme = localStorage.getItem('theme') || 'dark';
		theme = getTheme as Theme;
	}
	const html = document.querySelector('#html') as Element;
	switch (theme) {
		case 'dark':
			localStorage.setItem('theme', theme);
			html?.classList.remove('light');
			html?.classList.add(theme);
			html?.setAttribute('data-theme', theme);
			break;
		case 'light':
			localStorage.setItem('theme', theme);
			html?.classList.remove('dark');
			html?.classList.add(theme);
			html?.setAttribute('data-theme', theme);
			break;
	}
	return theme;
};
