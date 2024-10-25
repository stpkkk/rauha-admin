export type BookingType = {
	id: number
	created_at: string
	startDate: string
	endDate: string
	numNights: number
	numGuests: number
	totalPrice: number
	status: string
	cabins: { name: string } | { name: string }[]
	guests:
		| { fullName: string; email: string }
		| { fullName: string; email: string }[]
}
