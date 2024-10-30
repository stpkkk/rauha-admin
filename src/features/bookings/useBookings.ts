import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'

const filterOptions = [
	{ value: 'all', label: 'Все' },
	{ value: 'checked-out', label: 'Выселился' },
	{ value: 'checked-in', label: 'Заселился' },
	{ value: 'unconfirmed', label: 'Не подтверждено' },
]

const sortByOptions = [
	{ value: 'startDate-desc', label: 'По дате (старые)' },
	{ value: 'startDate-asc', label: 'По дате (новые)' },
	{
		value: 'totalPrice-desc',
		label: 'По цене (выше)',
	},
	{ value: 'totalPrice-asc', label: 'По цене (ниже)' },
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
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
	const [field, direction] = sortByRaw.split('-')
	const sortBy = { field, direction }

	const {
		isPending,
		error,
		data: bookings,
	} = useQuery({
		//['bookings', filter, sortBy] - dependency array, fetch and cache data if some value change
		queryKey: ['bookings', filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	})

	return { isPending, error, bookings, filterOptions, sortByOptions }
}