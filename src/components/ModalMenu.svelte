<script lang="ts">
	import { notesStore } from '../store/store';
	export let open: boolean = false;
	export let noteText: string = '';
	export let noteId: string = '';
	export let onClose: () => void;
	let isSaving: boolean = false;
	let isDeliting: boolean = false;

	$: text = noteText;
	$: isEdited = noteText !== text;

	const closeHandler = () => {
		onClose();
	};

	export const saveHandler = async () => {
		try {
			isSaving = true;
			const res = await fetch('/api', {
				method: 'PATCH',
				body: JSON.stringify({ noteId: noteId, noteText: text })
			});
			const { notes } = await res.json();
			notesStore.set(notes);
			isSaving = false;
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(e.message);
			}
		}
		closeHandler();
	};
	const deleteHandler = async () => {
		try {
			isDeliting = true;
			const res = await fetch('/api', {
				method: 'DELETE',
				body: JSON.stringify(noteId)
			});
			const { notes } = await res.json();
			notesStore.set(notes);
			isDeliting = false;
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(e.message);
			}
		}
		closeHandler();
	};
</script>

<div class={`fixed inset-0 ${open ? 'flex' : 'hidden'} items-center justify-center`}>
	<div on:keydown on:click={closeHandler} class="fixed inset-0 bg-gray-500 bg-opacity-75" />
	<div
		class="relative z-20 w-4/5 h-3/4 flex flex-col items-center justify-center rounded-sm bg-white dark:bg-gray-800"
	>
		<textarea
			bind:value={text}
			rows="15"
			cols="30"
			maxlength="10000"
			class="textarea rounded-none bg-stone-100 text-black dark:bg-gray-900 dark:text-yellow-50"
		/>
		<div class="absolute bottom-2 flex gap-2">
			{#if isEdited}
				<button disabled={isSaving} on:click={saveHandler} class="btn btn-sm"
					>{isSaving ? 'saving' : 'save'}</button
				>
			{/if}
			<button disabled={isDeliting} on:click={deleteHandler} class="btn btn-error btn-sm"
				>{isDeliting ? 'deleting' : 'delete'}</button
			>
		</div>
	</div>
</div>
