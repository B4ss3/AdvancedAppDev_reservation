<script>
	import {
		constructAddress,
		getRoomString,
		getRandomPicture,
	} from '$lib/constants';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;

	let totalIncome = 0;
	let totalExpenses = 0;

	const calculateRent = (acc, b) => acc + b.rentAmount;

	onMount(() => {
		totalIncome = data.apartments.data.reduce(calculateRent, 0);
		totalExpenses = data.rent.data.reduce(calculateRent, 0);
	});
</script>

<h1>You are a landlord of:</h1>

<div class="grid grid-cols-4 gap-4 p-2">
	{#each data.apartments.data as apartment}
		{@const roomString = getRoomString(apartment) || null}
		<div class="card variant-glass-primary card-hover overflow-hidden">
			<header>
				<img
					src={getRandomPicture()}
					class="bg-black/50 w-full aspect-[21/9]"
					alt={apartment.address}
				/>
			</header>
			<div class="p-4 space-y-4">
				<h6 class="h6 block">
					{constructAddress(apartment)}
					<br />
					<span>{apartment.area} m²</span>
					{#if roomString}
						<span>&nbsp;({roomString})</span>
					{/if}
				</h6>
				<article>
					<p>
						{#if apartment.description}
							{apartment.description}
						{:else}
							No description
						{/if}
					</p>
				</article>
			</div>

			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h4 class="h4 ml-auto mr-2">{apartment.rentAmount} €/kk</h4>
					{#if data.user && data.user.id === apartment.owner.userId}
						<button
							type="button"
							class="btn variant-filled"
							on:click={async () =>
								await goto(`/apartments/${apartment.apartmentId}/update`)}
						>
							<span>Update</span>
						</button>
					{/if}
				</div>
			</footer>
		</div>
	{/each}
</div>
<div>
	Total monthly income: {totalIncome} €
</div>

<h1>You are a tenant in:</h1>

<div class="grid grid-cols-4 gap-4 p-2">
	{#each data.rent.data as rent}
		{#if data.user && data.user.id != rent.owner.userId}
			{@const roomString = getRoomString(rent) || null}
			<div class="card variant-glass-primary card-hover overflow-hidden">
				<header>
					<img
						src={getRandomPicture()}
						class="bg-black/50 w-full aspect-[21/9]"
						alt={data.apartments.data.address}
					/>
				</header>
				<div class="p-4 space-y-4">
					<h6 class="h6 block">
						{constructAddress(rent)}
						<br />
						<span>{rent.area} m²</span>
						{#if roomString}
							<span>&nbsp;({roomString})</span>
						{/if}
					</h6>
					<article>
						<p>
							{#if rent.description}
								{rent.description}
							{:else}
								No description
							{/if}
						</p>
					</article>
				</div>
				<hr class="opacity-50" />
				<footer class="p-4 flex justify-start items-center space-x-4">
					<div class="flex-auto flex justify-between items-center">
						<h6
							class="font-bold"
							data-toc-ignore
						>
							By {rent.owner.fullName}
						</h6>
						<h4 class="h4 ml-auto mr-2">{rent.rentAmount} €/kk</h4>
					</div>
				</footer>
			</div>
		{/if}
	{/each}
</div>
<div>
	Total monthly expenses: {totalExpenses} €
</div>
