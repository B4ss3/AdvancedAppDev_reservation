<script>
	import '../app.postcss';
	import { goto } from '$app/navigation';
	import { HomeOutline, MessagesOutline } from 'flowbite-svelte-icons';

	export let data;
</script>

<header>
	<nav class="flex align-middle gap-1 p-2">
		<button
			type="button"
			class="btn variant-filled"
			on:click={async () => await goto('/')}
		>
			<span><HomeOutline /></span>
			<span>Apartments</span>
		</button>
		<button
			type="button"
			class="btn variant-filled"
			on:click={async () => await goto('/apartments/create')}
		>
			<span>Add new apartment</span>
		</button>
		<button
			type="button"
			class="btn variant-filled"
			on:click={async () => await goto('/me/applications')}
		>
			<span><MessagesOutline /></span>
			<span>Applications</span>
		</button>

		{#if data.user}
			<p class="ml-60">
				Hello {data.user.sub}
			</p>
			<button
				type="button"
				class="btn variant-filled ml-auto"
				on:click={async () => await goto('/logout')}
			>
				<span>Logout</span>
			</button>
		{:else}
			<button
				type="button"
				class="btn variant-filled ml-auto"
				on:click={async () => await goto('/login')}
			>
				<span>Login</span>
			</button>
		{/if}
	</nav>
</header>
<main>
	<slot />
</main>
