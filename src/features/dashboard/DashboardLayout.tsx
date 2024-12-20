import styled from 'styled-components'
import { useRecentBookings } from './useRecentBooking'
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays'
import Stats from './Stats'
import { BookingType } from '../../types/booking'
import { useSearchParams } from 'react-router-dom'
import { useCabins } from '../cabins/useCabins'
import SalesChart from './SalesChart'
import DurationChart from './DurationChart'
import TodayActivity from '../check-in-out/TodayActivity'

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`
const DashboardLayout = () => {
	const [searchparams] = useSearchParams()
	const { bookings, isPending: isPendingBookings } = useRecentBookings()
	const { confirmedStays, isPending: isPendingStays } = useRecentStays()
	const { cabins, isPending: isPendingCabins } = useCabins()

	const numDays = !searchparams.get('last')
		? 7
		: Number(searchparams.get('last'))

	if (isPendingBookings || isPendingStays || isPendingCabins) return <Spinner />

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings as BookingType[]}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins?.length || 0}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings as BookingType[]} numDays={numDays} />
		</StyledDashboardLayout>
	)
}

export default DashboardLayout
