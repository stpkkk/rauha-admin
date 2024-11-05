export type BookingType = {
	id: number
	created_at: string
	startDate: string
	endDate: string
	numNights: number
	numGuests: number
	cabinPrice: number
	extrasPrice: number
	totalPrice: number
	hasBreakfast: boolean
	observations: string
	isPaid: boolean
	status: string
	guests: {
		fullName: string
		email: string
		homeTown: string
		passportId: string
	}
	cabins: {
		name: string
	}
}