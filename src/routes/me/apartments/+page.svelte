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

<svelte:head>
	<title>My Apartments</title>
</svelte:head>

<section class="mt-5">
	<h3 class="h3">You are a landlord of:</h3>
	<div class="grid grid-cols-4 gap-4">
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
									await goto(`/apartments/${apartment.apartmentId}/edit`)}
							>
								<span>Edit</span>
							</button>
						{/if}
					</div>
				</footer>
			</div>
		{/each}
	</div>
	<footer class="m-2 h4">
		Total monthly income: <span class="font-bold">{totalIncome}</span> €
		<!-- <button class="btn variant-filled"  type="button">Transaction history</button> -->
	</footer>
</section>

<section class="mt-5">
	<h3 class="h3">You are a tenant in:</h3>

	<div class="grid grid-cols-4 gap-4">
		{#each data.rent.data as rent}
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
		{/each}
	</div>
	<footer class="m-2 h4">
		Total monthly expenses: <span class="font-bold">{totalExpenses}</span> €
		<!-- <button class="btn variant-filled" type="button">Pay</button> -->
	</footer>
</section>
