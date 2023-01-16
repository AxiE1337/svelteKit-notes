<script lang="ts">
	import { notesStore } from '../store/store';
	export let open: boolean = false;
	export let noteText: string | null | undefined = '';
	export let noteId: string = '';
	export let onClose: () => void;

	const closeHandler = () => {
		onClose();
	};

	export const saveHandler = async () => {
		const res = await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ noteId: noteId, noteText: noteText })
		});
		const { notes } = await res.json();
		notesStore.set(notes);
		closeHandler();
	};
	const deleteHandler = async () => {
		const res = await fetch('/api', {
			method: 'DELETE',
			body: JSON.stringify(noteId)
		});
		const { notes } = await res.json();
		notesStore.set(notes);
		closeHandler();
	};
</script>

<div class={`fixed inset-0 ${open ? 'flex' : 'hidden'} items-center justify-center`}>
	<div on:keydown on:click={closeHandler} class="fixed inset-0 bg-gray-500 bg-opacity-75" />
	<div class="z-20 w-3/4 h-2/4 flex flex-col items-center justify-center bg-white text-black">
		<textarea bind:value={noteText} rows="10" cols="40" />
		<button on:click={saveHandler} class="btn btn-sm">save</button>
		<button on:click={deleteHandler} class="btn btn-sm">delete</button>
	</div>
</div>
