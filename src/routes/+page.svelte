<script lang="ts">
	import '../styles/app.css';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { notesStore } from '../store/store';
	import dateFormat from '$lib/dateFormat';
	import ModalMenu from '../components/ModalMenu.svelte';

	export let data: PageData;
	notesStore.set(data.notes);

	let open: boolean = false;
	let modalText: string | null | undefined = '';
	let noteId: string = '';

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
	<input type="text" placeholder="Search for notes" />
	<div class="flex flex-col">
		{#each $notesStore as note}
			<div
				on:keydown
				on:click={() => {
					openModalHandler();
					modalText = note.text;
					noteId = note.id;
				}}
				class="flex flex-col border p-4 my-2 whitespace-pre-line"
			>
				<h1>{note.text}</h1>
				{#if typeof note.updated_at === 'string'}
					<p>{note?.updated_at}</p>
				{:else}
					<p>{dateFormat(note?.updated_at ? note.updated_at : undefined)}</p>
				{/if}
			</div>
		{/each}
	</div>
	<form method="POST" action="?/addNote" use:enhance={addNoteHandler}>
		<input type="text" name="note" />
		<button class="btn btn-xs">add</button>
	</form>
	<ModalMenu {open} onClose={openModalHandler} noteText={modalText} {noteId} />
</div>
