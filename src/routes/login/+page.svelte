<script lang="ts">
	import '../../styles/app.css';
	import { signIn } from '@auth/sveltekit/client';

	const handleLogin = async () => {
		signIn('github', { callbackUrl: '/' });
	};
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
	<button class="btn" on:click={handleLogin}>log in with GitHub</button>
</div>
