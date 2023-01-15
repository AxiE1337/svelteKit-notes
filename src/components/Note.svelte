<script lang="ts">
	import type { INote } from '$lib/types';
	import dateFormat from '$lib/dateFormat';

	export let note: INote;
</script>

<div class="flex flex-col border p-4 my-2 whitespace-pre-line">
	<h1>{note.text}</h1>
	<p>{dateFormat(note?.updated_at ? note.updated_at : undefined)}</p>
</div>
