import styled from 'styled-components'
import { BookingType } from '../../types/booking'
import Tag from '../../ui/Tag'
import { Link } from 'react-router-dom'
import { IoMdLogIn } from 'react-icons/io'
import CheckoutButton from './CheckoutButton'

type TodayItemProps = {
	activity: BookingType
}

const StyledTodayItem = styled.li`
	display: grid;
	grid-template-columns: 9rem 9rem 3fr 6rem 4rem;
	gap: 1.2rem;
	align-items: center;

	font-size: 1.4rem;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-100);

	&:first-child {
		border-top: 1px solid var(--color-grey-100);
	}
`

const Guest = styled.div`
	font-weight: 500;
`

function TodayItem({ activity }: TodayItemProps) {
	const { id, status, guests, numNights } = activity

	const guestInfo = Array.isArray(guests) ? guests[0] : guests

	return (
		<StyledTodayItem>
			{status === 'Не подтверждено' && <Tag type='green'>Прибывает</Tag>}
			{status === 'Заселился' && <Tag type='blue'>Отбывает</Tag>}

			<div>{guestInfo?.homeTown}</div>
			<Guest>{guestInfo?.fullName}</Guest>
			<div>{numNights} ночей</div>

			{status === 'Не подтверждено' && (
				<Link to={`/check-in/${id}`} title='Заселить'>
					<IoMdLogIn size={20} color='green' />
				</Link>
			)}

			{status === 'Заселился' && <CheckoutButton bookingId={id} />}
		</StyledTodayItem>
	)
}
export default TodayItem
