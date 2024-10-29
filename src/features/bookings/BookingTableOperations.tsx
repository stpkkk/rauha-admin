import SortBy from '../../ui/SortBy'
import Filter from '../../ui/Filter'
import { TableOperations } from '../../ui/TableOperations'
import { useBookings } from './useBookings'

function BookingTableOperations() {
  const { filterOptions, sortByOptions } = useBookings()

	return (
		<TableOperations>
			<Filter filterField='status' options={filterOptions} />

			<SortBy options={sortByOptions} />
		</TableOperations>
	)
}

export default BookingTableOperations
