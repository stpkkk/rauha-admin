import SortBy from '../../ui/SortBy'
import Filter from '../../ui/Filter'
import { TableOperations } from '../../ui/TableOperations'
import { useBookings } from './useBookings'

function BookingTableOperations() {
  const { filterOptions } = useBookings()

	return (
		<TableOperations>
			<Filter filterField='status' options={filterOptions} />

			<SortBy
				options={[
					{ value: 'startDate-desc', label: 'По дате (старые)' },
					{ value: 'startDate-asc', label: 'По дате (новые)' },
					{
						value: 'totalPrice-desc',
						label: 'По цене (выше)',
					},
					{ value: 'totalPrice-asc', label: 'По цене (ниже)' },
				]}
			/>
		</TableOperations>
	)
}

export default BookingTableOperations
