import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

export function useBooking() {
	const { id } = useParams()

	const {
		isPending,
		error,
		data: booking,
	} = useQuery({
		queryKey: ['booking', id],
		queryFn: () => getBooking(id || ''),
		retry: false,
	})

	return { isPending, error, booking }
}
