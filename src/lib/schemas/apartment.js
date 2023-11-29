import { z } from 'zod';
import { APARTMENT_TYPES } from '$lib/constants';

export default z.object({
	rentAmount: z.number(),
	area: z.number(),
	apartmentType: z.enum(Object.keys(APARTMENT_TYPES)),
	description: z.string().default(''),
	streetName: z.string().max(45),
	cityName: z.string().max(45),
	postalCode: z.string().max(10),
	apartmentNumber: z.string().max(10),
	roomNormalCount: z.number().int().max(10),
	roomKitchenCount: z.number().int().max(10),
	roomBalconyCount: z.number().int().max(10),
	roomBathroomCount: z.number().int().max(10),
});
