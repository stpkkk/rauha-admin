import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getBookingsAfterDate } from '../../services/apiBookings'

export function useRecentBookings() {
	const [searchparams] = useSearchParams()

	const numDays = !searchparams.get('last')
		? 7
		: Number(searchparams.get('last'))

	//https://date-fns.org/v4.1.0/docs/subDays
	const queryDate = subDays(new Date(), numDays).toISOString()

	const { data: bookings, isPending } = useQuery({
		queryFn: () => getBookingsAfterDate(queryDate),
		queryKey: ['bookings', `last-${numDays}`],
	})

	return { bookings, isPending }
}
