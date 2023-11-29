/* ENUMS */
export const APARTMENT_TYPES = {
	ONE_ROOM_FLAT: 'One room flat',
	TWO_ROOM_FLAT: 'Two room flat',
	THREE_ROOM_FLAT: 'Three room flat',
};

export const APPLICATION_STATUS = {
	PENDING: 'Pending',
	ACCEPTED: 'Accepted',
	DECLINED: 'Declined',
};

const pictureLinks = [
	'https://d2ue5ppt0wsjaa.cloudfront.net/640x427,fit/vuokraovimedia/images/162/823/712/412/162823712412664_original.jpg',
	'https://d2ue5ppt0wsjaa.cloudfront.net/640x427,fit/vuokraovimedia/images/170/064/956/491/170064956491299_original.jpg',
	'https://d2ue5ppt0wsjaa.cloudfront.net/640x427,fit/vuokraovimedia/images/167/403/220/573/167403220573367_original.jpg',
	'https://kumppanisisallot.fi/etuovicom/wp-content/uploads/sites/18/2023/06/Torkkelinmaki_101459.jpg',
];

export const getRandomPicture = () => {
	const r = Math.floor(Math.random() * pictureLinks.length);
	return pictureLinks[r];
};

export const getRoomString = (apartment) => {
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

export const constructAddress = (apartment) => {
	let { cityName, postalCode, streetName, apartmentNumber } = apartment;
	// cannot default in deconstruct if value is null
	if (cityName === null) cityName = 'Turku';
	if (postalCode === null) postalCode = '20540';
	if (streetName === null) streetName = 'Jaanintie 34';
	if (apartmentNumber === null) apartmentNumber = 'D 72';

	return `${streetName} ${apartmentNumber}, ${postalCode}, ${cityName}`;
};
