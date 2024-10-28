import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

const filterOptions = [
	{ value: 'all', label: 'Все' },
	{ value: 'checked-out', label: 'Выселился' },
	{ value: 'checked-in', label: 'Заселился' },
	{ value: 'unconfirmed', label: 'Не подтверждено' },
]

export function useBookings() {
	const [searchParams] = useSearchParams()

	//FILTER
	const filterValue = searchParams.get('status')

	const filter =
		!filterValue || filterValue === 'all'
			? null
			: {
					field: 'status',
					value: filterValue,
					label:
						filterOptions.find(option => option.value === filterValue)?.label ||
						filterValue,
			  }

	//SORTBY

	const {
		isPending,
		error,
		data: bookings,
	} = useQuery({
		queryKey: ['bookings', filter],
		queryFn: () => getBookings({ filter }),
	})

	return { isPending, error, bookings, filterOptions }
}