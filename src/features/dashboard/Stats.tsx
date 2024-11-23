import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2'
import { BookingType } from '../../types/booking'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

type StatsProps = {
	bookings: BookingType[]
	confirmedStays: BookingType[] | undefined
	numDays: number
	cabinCount: number
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
	const numBookings = bookings.length

	const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0)

	const checkIns = confirmedStays?.length

	//occupation = num check in nights / all available nights (num days * num cabins)
	const occupation =
		confirmedStays &&
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
			(numDays * cabinCount)
	const occupationPercent = occupation && Math.round(occupation * 100) + '%'

	return (
		<>
			<Stat
				title='Бронирований'
				color='blue'
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title='Прибыль'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales || 0)}
			/>
			<Stat
				title='Заселено'
				color='indigo'
				icon={<HiOutlineCalendarDays />}
				value={checkIns || 0}
			/>
			<Stat
				title='Заполняемость'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={occupationPercent || 0}
			/>
		</>
	)
}

export default Stats
