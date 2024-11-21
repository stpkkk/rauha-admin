import styled from 'styled-components'
import { useRecentBookings } from './useRecentBooking'
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays'

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`
const DashboardLayout = () => {
	const { bookings, isPending: isPendingBookings } = useRecentBookings()
	const { stays, confirmedStays, isPending: isPendingStays } = useRecentStays()

	if (isPendingBookings || isPendingStays) return <Spinner />

	console.log('stays:', stays)

	return (
		<StyledDashboardLayout>
			<div>Статистика</div>
			<div>Активность за сегодня</div>
			<div>График прибывания в отеле</div>
			<div>График скидок</div>
		</StyledDashboardLayout>
	)
}

export default DashboardLayout
