<script lang="ts">
	import '../styles/app.css';
	import type { PageData } from './$types';
	import { signOut } from '@auth/sveltekit/client';

	export let data: PageData;

	const signOutHandler = async () => {
		await signOut({ callbackUrl: '/login' });
		window.location.reload();
	};
</script>

<nav class="fixed navbar bg-base-100">
	<div class="flex-1" />
	{#if data.session}
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="321" src={data.session?.user?.image} />
					</div>
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<!-- <li><button>Settings</button></li> -->
					<li><button on:click={signOutHandler}>Logout</button></li>
				</ul>
			</div>
		</div>
	{/if}
</nav>
<slot />
