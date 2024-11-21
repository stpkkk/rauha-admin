import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'

export function useRecentStays() {
	const [searchparams] = useSearchParams()

	const numDays = !searchparams.get('last')
		? 7
		: Number(searchparams.get('last'))

	//https://date-fns.org/v4.1.0/docs/subDays
	const queryDate = subDays(new Date(), numDays).toISOString()

	const { data: stays, isPending } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ['stays', `last-${numDays}`],
	})

	const confirmedStays = stays?.filter(
		stay => stay.status === 'Заселился' || stay.status === 'Выселился'
	)

	return { stays, confirmedStays, isPending }
}
