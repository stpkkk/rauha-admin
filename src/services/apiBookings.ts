import { PAGE_SIZE } from '../utils/constants'
import { getToday } from '../utils/helpers'
import supabase from './supabase'

type BookingFilterOptions = {
	filter: {
		field: string
		value: string
		label: string
	} | null
	sortBy: {
		field: string
		direction: string
	}
	page: number
}
type BookingType = {
	id: number
	created_at: string
	startDate: string
	endDate: string
	numNights: number
	numGuests: number
	totalPrice: number
	status: string
	guests: {
		fullName: string
		email: string
		homeTown?: string
		passportId?: string
	}[]
	cabins: {
		name: string
	}[]
}

type BookingsQueryResult = {
	data: BookingType[]
	count: number | null
}

export async function getBookings({
	filter,
	sortBy,
	page,
}: BookingFilterOptions): Promise<BookingsQueryResult> {
	let query = supabase.from('bookings').select(
		'id, created_at, startDate, endDate, numNights, numGuests, totalPrice,status, cabins(name), guests(fullName, email)',
		//get the number of results(bookings)
		{ count: 'exact' }
	)

	// FILTER
	if (filter) {
		// No filtering needed for 'all'
		if (filter.value === 'all') {
		} else {
			query = query.eq(filter.field, filter.label)
		}
	}

	//SORTBY
	if (sortBy)
		query = query.order(sortBy.field, { ascending: sortBy.direction === 'asc' })

	//PAGINATION
	if (page) {
		const from = (page - 1) * PAGE_SIZE
		const to = from + PAGE_SIZE - 1

		query.range(from, to)
	}

	const { data, error, count } = await query

	if (error) {
		console.error(error)
		throw new Error('Bookings could not be loaded')
	}

	return { data, count }
}

export async function getBooking(id: string) {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, cabins(*), guests(*)')
		.eq('id', id)
		.single()

	if (error) {
		console.error(error)
		throw new Error('Booking not found')
	}

	return data
}

export async function updateBooking(id: number, obj: any) {
	const { data, error } = await supabase
		.from('bookings')
		.update(obj)
		.eq('id', id)
		.select()
		.single()

	if (error) {
		console.error(error)
		throw new Error('Booking could not be updated')
	}
	return data
}

export async function deleteBooking(id: number) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('bookings').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('Booking could not be deleted')
	}
	return data
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString (supabase expects this format)
export async function getBookingsAfterDate(date: string) {
	const { data, error } = await supabase
		.from('bookings')
		.select('created_at, totalPrice, extrasPrice')
		//`gte`: Greater Than or Equal to (Больше или равно)
		//`lte`: Less Than or Equal to (Меньше или равно)
		//Вместе эти два метода создают запрос, который выбирает все записи, созданные в промежутке от переданной `date` до конца текущего дня.
		.gte('created_at', date)
		.lte('created_at', getToday({ end: true }))

	if (error) {
		console.error(error)
		throw new Error('Bookings could not get loaded')
	}

	return data
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, guests(fullName)')
		.gte('startDate', date)
		.lte('startDate', getToday())

	if (error) {
		console.error(error)
		throw new Error('Bookings could not get loaded')
	}

	return data
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
		.from('bookings')
		.select('*, guests(fullName, homeTown, passportId)')
		.or(
			`and(status.eq.Не подтверждено,startDate.eq.${getToday()}),and(status.eq.Заселился,endDate.eq.${getToday()})`
		)
		.order('created_at')

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'Не подтверждено' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'Заселился' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error)
		throw new Error('Ошибка с загрузкой бронирований!')
	}
	return data
}