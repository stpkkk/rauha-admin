import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'

export function useBookings() {
	const {
		isPending,
		error,
		data: bookings,
	} = useQuery({
		queryKey: ['bookings'],
		queryFn: getBookings,
	})

	return { isPending, error, bookings }
}
