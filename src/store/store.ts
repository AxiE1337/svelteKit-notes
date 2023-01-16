import { writable } from 'svelte/store';
import type { INote } from '$lib/types';

export const notesStore = writable<INote[]>([]);
