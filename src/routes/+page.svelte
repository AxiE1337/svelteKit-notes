<script lang="ts">
	import '../styles/app.css';
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import dateFormat from '$lib/dateFormat';
	import ModalMenu from '../components/ModalMenu.svelte';

	export let data: PageServerData;

	let open: boolean = false;
	let modalText: string | null | undefined = '';
	let noteId: string = '';

	const openModalHandler = () => {
		open = !open;
	};
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
	<h1>Notes</h1>
	<input type="text" placeholder="Search for notes" />
	<div class="flex flex-col">
		{#each data.notes as note}
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
				<p>{dateFormat(note?.updated_at ? note.updated_at : undefined)}</p>
			</div>
		{/each}
	</div>
	<form method="POST" action="?/addNote" use:enhance>
		<input type="text" name="note" />
		<button class="btn btn-xs">add</button>
	</form>
	<ModalMenu {open} onClose={openModalHandler} noteText={modalText} {noteId} />
</div>
