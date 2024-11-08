import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { BookingType } from '../../types/booking'
import { useBookings } from './useBookings'
import Spinner from '../../ui/Spinner'
import Empty from '../../ui/Empty'
import Pagination from '../../ui/Pagination'

function BookingTable() {
	const { bookings, isPending, error, count } = useBookings()

	const normalizedBookings = bookings.map((booking: BookingType) => ({
		...booking,
		cabins: Array.isArray(booking.cabins) ? booking.cabins : [booking.cabins],
		guests: Array.isArray(booking.guests) ? booking.guests : [booking.guests],
	}))

	if (isPending) return <Spinner />

	if (error) return <div>An error has occurred: {error.message}</div>

	if (!bookings?.length) return <Empty resourceName='Бронирования' />

	return (
		<Menus>
			<Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
				<Table.Header>
					<div>Номер</div>
					<div>Гости</div>
					<div>Даты</div>
					<div>Статус</div>
					<div>Стоимость</div>
					<div></div>
				</Table.Header>

				<Table.Body<BookingType>
					data={normalizedBookings}
					render={booking => <BookingRow key={booking.id} booking={booking} />}
				/>
				<Table.Footer>
					<Pagination numResults={count} />
				</Table.Footer>
			</Table>
		</Menus>
	)
}

export default BookingTable
