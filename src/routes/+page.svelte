<script lang="ts">
	import '../styles/app.css';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { INote } from '$lib/types';
	import { enhance } from '$app/forms';
	import { notesStore } from '../store/store';
	import dateFormat from '$lib/dateFormat';
	import ModalMenu from '../components/ModalMenu.svelte';

	export let data: PageData;
	notesStore.set(data.notes);

	let open: boolean = false;
	let modalText: string | null | undefined = '';
	let noteId: string = '';
	let searchTagValue: string = '';
	let filteredNotes: INote[] = [];

	$: filteredNotes = $notesStore.filter((note) => note.text.includes(searchTagValue));

	const openModalHandler = () => {
		open = !open;
	};
	const addNoteHandler: SubmitFunction = ({ data, cancel }) => {
		const { note } = Object.fromEntries(data);
		if (note.length < 1) {
			cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				notesStore.set(result.data?.notes);
				await update();
			}
		};
	};
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
	<h1>Notes</h1>
	<input
		type="text"
		placeholder="Search for notes"
		class="input input-bordered rounded-md w-full max-w-xs"
		bind:value={searchTagValue}
	/>
	<div class="grid grid-cols-2 auto-rows-auto w-4/5">
		{#each filteredNotes as note}
			<div
				on:keydown
				on:click={() => {
					openModalHandler();
					modalText = note.text;
					noteId = note.id;
				}}
				class="relative border p-4 my-2 mx-2 max-h-52  overflow-hidden rounded-md"
			>
				<h1 class="mb-2 whitespace-pre-line">{note.text}</h1>
				<p class="absolute bottom-1 text-xs bg-white select-none">
					{dateFormat(note?.updated_at ? note?.updated_at : undefined)}
				</p>
			</div>
		{/each}
	</div>
	<form
		method="POST"
		action="?/addNote"
		use:enhance={addNoteHandler}
		class="flex items-center justify-center"
	>
		<input
			type="text"
			name="note"
			class="input input-bordered w-full max-w-xs rounded-none rounded-l-md"
			placeholder="text..."
		/>
		<button class="btn rounded-none rounded-r-md">add</button>
	</form>
	<ModalMenu {open} onClose={openModalHandler} noteText={modalText} {noteId} />
</div>
