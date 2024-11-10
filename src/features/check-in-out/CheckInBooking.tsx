import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import Spinner from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import Checkbox from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import { useCheckIn } from './useCheckIn'

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`

function CheckInBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false)
	const moveBack = useMoveBack()
	const { checkIn, isCheckingIn } = useCheckIn()

	const { booking, isPending } = useBooking()

	const {
		id: bookingId,
		guests,
		totalPrice,
		// numGuests,
		// hasBreakfast,
		// numNights,
	} = booking || {}

	function handleCheckIn() {
		if (!confirmPaid) return

		checkIn(bookingId)
	}

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking])

	if (isPending || isCheckingIn) return <Spinner />

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid(confirm => !confirm)}
					disabled={confirmPaid || isCheckingIn}
					id='confirm'
				>
					Я подтверждаю что {guests.fullName} полностью оплатил всю сумму{' '}
					{formatCurrency(totalPrice)}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
					Check in booking #{bookingId}
				</Button>
				<Button variation='secondary' onClick={moveBack}>
					Назад
				</Button>
			</ButtonGroup>
		</>
	)
}

export default CheckInBooking
