<script>
	import { APARTMENT_TYPES } from '$lib/constants';
	import { goto } from '$app/navigation';

	export let data;
	console.log(data);

	const pictureLinks = [
		'https://d2ue5ppt0wsjaa.cloudfront.net/640x427,fit/vuokraovimedia/images/162/823/712/412/162823712412664_original.jpg',
		'https://d2ue5ppt0wsjaa.cloudfront.net/640x427,fit/vuokraovimedia/images/170/064/956/491/170064956491299_original.jpg',
		'https://d2ue5ppt0wsjaa.cloudfront.net/640x427,fit/vuokraovimedia/images/167/403/220/573/167403220573367_original.jpg',
		'https://kumppanisisallot.fi/etuovicom/wp-content/uploads/sites/18/2023/06/Torkkelinmaki_101459.jpg',
	];

	const getRandomPicture = () => {
		const r = Math.floor(Math.random() * pictureLinks.length);
		return pictureLinks[r];
	};

	const constructAddress = (apartment) => {
		let { cityName, postalCode, streetName, apartmentNumber } = apartment;
		// cannot default in deconstruct if value is null
		if (cityName === null) cityName = 'Turku';
		if (postalCode === null) postalCode = '20540';
		if (streetName === null) streetName = 'Jaanintie 34';
		if (apartmentNumber === null) apartmentNumber = 'D 72';

		return `${streetName} ${apartmentNumber}, ${postalCode}, ${cityName}`;
	};

	const convertType = (rawType) => {
		return APARTMENT_TYPES[rawType] || undefined;
	};

	const getRoomString = (apartment) => {
		// returns a string representation of room counts
		// e.g. 1 h + kt + s + kh + s
		const {
			roomNormalCount,
			roomKitchenCount,
			roomBalconyCount,
			roomBathroomCount,
		} = apartment;

		let roomStrings = [];
		if (roomNormalCount > 0) roomStrings.push(`${roomNormalCount} h`);
		if (roomKitchenCount > 0) roomStrings.push(`${roomKitchenCount} kt`);
		if (roomBathroomCount > 0) roomStrings.push(`${roomBathroomCount} kh`);
		if (roomBalconyCount > 0) roomStrings.push(`${roomBalconyCount} p`);

		return roomStrings.join(' + ');
	};
</script>

{#await data.apartments}
	<p>Waiting...</p>
{:then apartments}
	<div class="grid grid-cols-4 gap-4">
		{#each apartments as apartment}
			{@const roomString = getRoomString(apartment) || null}
			<div class="card .variant-glass-primary card-hover overflow-hidden">
				<header>
					<img
						src={getRandomPicture()}
						class="bg-black/50 w-full aspect-[21/9]"
						alt={apartments.address}
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
							By {apartment.owner.firstName + ' ' + apartment.owner.lastName}
						</h6>
						<h4 class="h4 ml-auto mr-2">{apartment.rentAmount} €/kk</h4>
						{#if data.user.id === apartment.owner.userId}
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
								<span>Rent</span>
							</button>
						{/if}
					</div>
				</footer>
			</div>
		{/each}
	</div>
{/await}
