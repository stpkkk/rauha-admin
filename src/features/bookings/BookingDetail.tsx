import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { Status, TagName } from '../../types/status'
import { useBooking } from './useBooking'
import Spinner from '../../ui/Spinner'
import { useNavigate } from 'react-router-dom'

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`

function BookingDetail() {
	const navigate = useNavigate()
	const { booking, isPending } = useBooking()

	const { status, id: bookingId } = booking || {}

	const moveBack = useMoveBack()

	if (isPending) return <Spinner />

	const statusToTagName: { [K in Status]: TagName } = {
		'Не подтверждено': 'blue',
		Заселился: 'green',
		Выселился: 'silver',
	}

	function isStatus(status: string): status is Status {
		return status in statusToTagName
	}

	if (status && !isStatus(status)) {
		console.error(`Invalid status: ${status}`)
		return null
	}

	return (
		<>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>Бронирование #{bookingId}</Heading>
					{status && isStatus(status) && (
						<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
					)}
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Назад</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === 'Не подтверждено' && (
					<Button onClick={() => navigate(`/check-in/${bookingId}`)}>
						Зарегистрировать
					</Button>
				)}
				<Button variation='danger'>Удалить бронирование</Button>
				<Button variation='secondary' onClick={moveBack}>
					Назад
				</Button>
			</ButtonGroup>
		</>
	)
}

export default BookingDetail
