<script lang="ts">
	import '../../styles/app.css';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
	<h1>{'Note ' + data.params.slug}</h1>
</div>
