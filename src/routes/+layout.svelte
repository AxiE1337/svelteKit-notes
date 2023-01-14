<script lang="ts">
	import '../styles/app.css';
	import type { PageData } from './$types';
	import { signOut } from '@auth/sveltekit/client';

	export let data: PageData;

	const signOutHandler = async () => {
		signOut({ callbackUrl: '/login' });
	};
</script>

<nav class="fixed flex w-full h-10 gap-4 items-center">
	<h2 class="text-red-500">NavBar</h2>
	{#if data.session}
		<button class="btn btn-xs" on:click={signOutHandler}>Sign out</button>
	{:else}
		<a class="btn btn-xs" href="/login">Sign In</a>
	{/if}
	<p>{data.session?.user?.name || ''}</p>
</nav>
<slot />
