<script lang="ts">
	import '../styles/app.css';
	import type { PageServerData } from './$types';
	import dateFormat from '../lib/dateFormat';

	export let data: PageServerData;
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
	<h1>Notes</h1>
	<input type="text" placeholder="Search for notes" />
	<div class="grid">
		{#each data.notes as note}
			<div class="border p-4 my-2 whitespace-pre-line">
				<a href="/1">
					<h1>{note.text}</h1>
					<!-- <p>{dateFormat(note?.updated_at)}</p> -->
					<p>{note?.updated_at}</p>
				</a>
			</div>
		{/each}
	</div>
</div>
