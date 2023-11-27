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

export const constructAddress = (apartment) => {
	let { cityName, postalCode, streetName, apartmentNumber } = apartment;
	// cannot default in deconstruct if value is null
	if (cityName === null) cityName = 'Turku';
	if (postalCode === null) postalCode = '20540';
	if (streetName === null) streetName = 'Jaanintie 34';
	if (apartmentNumber === null) apartmentNumber = 'D 72';

	return `${streetName} ${apartmentNumber}, ${postalCode}, ${cityName}`;
};
