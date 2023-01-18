<script lang="ts">
	import '../../styles/app.css';
	import { signIn } from '@auth/sveltekit/client';

	const handleLoginGitHub = async () => {
		signIn('github', { callbackUrl: '/' });
	};
	const handleLoginGoogle = async () => {
		signIn('google', { callbackUrl: '/' });
	};
</script>

<div class="flex flex-col min-h-screen items-center justify-center gap-5">
	<button class="btn" on:click={handleLoginGitHub}>log in with GitHub</button>
	<button class="btn" on:click={handleLoginGoogle}>log in with Google</button>
</div>
