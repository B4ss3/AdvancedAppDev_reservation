<script>
	import { APARTMENT_TYPES, constructAddress, getRoomString, getRandomPicture } from '$lib/constants';
	import { goto } from '$app/navigation';
	export let data;
</script>

	<div class="grid grid-cols-4 gap-4 p-2">
		{#each data.apartments as apartment}
			{@const roomString = getRoomString(apartment) || null}
			<div class="card variant-glass-primary card-hover overflow-hidden">
				<header>
					<img
						src={getRandomPicture()}
						class="bg-black/50 w-full aspect-[21/9]"
						alt={data.apartments.address}
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
				<hr class="opacity-50" />
				<footer class="p-4 flex justify-start items-center space-x-4">
					<div class="flex-auto flex justify-between items-center">
						<h6
							class="font-bold"
							data-toc-ignore
						>
							By {apartment.owner.fullName}
						</h6>
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
						{:else}
							<button
								type="button"
								class="btn variant-filled"
								on:click={async () =>
									await goto(`/apartments/${apartment.apartmentId}/apply`)}
							>
								<span>Apply</span>
							</button>
						{/if}
					</div>
				</footer>
			</div>
		{/each}
	</div>
