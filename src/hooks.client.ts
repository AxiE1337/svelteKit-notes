import { browser } from '$app/environment';
import type { Theme } from '$lib/types';

export const setTheme = async (theme?: Theme) => {
	if (browser) {
		const getTheme = (localStorage.getItem('theme') as Theme) || 'light';
		if (theme) {
			localStorage.setItem('theme', theme);
		} else {
			theme = getTheme;
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
	}
	return theme;
};
setTheme();
