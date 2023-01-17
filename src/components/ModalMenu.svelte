<script lang="ts">
	import { notesStore } from '../store/store';
	export let open: boolean = false;
	export let noteText: string = '';
	export let noteId: string = '';
	export let onClose: () => void;

	$: text = noteText;
	$: isEdited = noteText !== text;

	const closeHandler = () => {
		onClose();
	};

	export const saveHandler = async () => {
		const res = await fetch('/api', {
			method: 'PATCH',
			body: JSON.stringify({ noteId: noteId, noteText: text })
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
	<div
		class="relative z-20 w-4/5 h-3/4 flex flex-col items-center justify-center rounded-sm bg-white text-black"
	>
		<textarea bind:value={text} rows="20" cols="70" class="textarea rounded-none bg-stone-100" />
		<div class="absolute bottom-2 flex gap-2">
			{#if isEdited}
				<button on:click={saveHandler} class="btn btn-sm">save</button>
			{/if}
			<button on:click={deleteHandler} class="btn btn-error btn-sm">delete</button>
		</div>
	</div>
</div>
