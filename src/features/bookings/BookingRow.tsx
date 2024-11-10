import { format, isToday } from 'date-fns'
import styled from 'styled-components'

import Table from '../../ui/Table'

import { HiArrowDownOnSquare, HiEye, HiTrash } from 'react-icons/hi2'
import { BookingType } from '../../types/booking'
import { Status, TagName } from '../../types/status'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import Tag from '../../ui/Tag'
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'

type BookingRowProps = {
	booking: BookingType
}

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`

function BookingRow({ booking }: BookingRowProps) {
	const navigate = useNavigate()
	const {
		id: bookingId,
		// created_at,
		startDate,
		endDate,
		numNights,
		// numGuests,
		totalPrice,
		status,
		guests,
		cabins,
	} = booking

	const statusToTagName: { [K in Status]: TagName } = {
		'Не подтверждено': 'blue',
		Заселился: 'green',
		Выселился: 'silver',
	}

	function isStatus(status: string): status is Status {
		return status in statusToTagName
	}

	if (!isStatus(status)) {
		console.error(`Invalid status: ${status}`)
		return null
	}

	const guest = Array.isArray(guests) ? guests[0] : guests
	const cabin = Array.isArray(cabins) ? cabins[0] : cabins

	return (
		<Table.Row>
			<Cabin>{cabin.name}</Cabin>

			<Stacked>
				<span>{guest.fullName}</span>
				<span>{guest.email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? 'Today'
						: formatDistanceFromNow(startDate)}
					&rarr; {numNights} night stay
				</span>
				<span>
					{format(new Date(startDate), 'MMM dd yyyy')} &mdash;
					{format(new Date(endDate), 'MMM dd yyyy')}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>
			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={bookingId?.toString()} />
					<Menus.List id={bookingId?.toString()}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/bookings/${bookingId}`)}
						>
							Детали
						</Menus.Button>

						{status === 'Не подтверждено' && (
							<Menus.Button
								icon={<HiArrowDownOnSquare />}
								onClick={() => navigate(`/check-in/${bookingId}`)}
							>
								Заселить
							</Menus.Button>
						)}

						<Modal.Open opens='delete'>
							{openModal => (
								<Menus.Button icon={<HiTrash />} onClick={openModal}>
									Удалить
								</Menus.Button>
							)}
						</Modal.Open>
					</Menus.List>

					{/* <Modal.Window name='delete'>
						{closeModal => (
							<ConfirmDelete
								resourceName='номер'
								disabled={isDeleting}
								onConfirm={() => deleteCabinMutation(cabinId)}
								onCloseModal={closeModal}
							/>
						)}
					</Modal.Window> */}
				</Menus.Menu>
			</Modal>
		</Table.Row>
	)
}

export default BookingRow
