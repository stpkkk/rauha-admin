import BookingTable from '../features/bookings/BookingTable'
import BookingTableOperations from '../features/bookings/BookingTableOperations'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Bookings() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Все бронирования</Heading>
				<BookingTableOperations />
			</Row>

			<BookingTable />
		</>
	)
}

export default Bookings
