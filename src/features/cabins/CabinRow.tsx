import styled from 'styled-components'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { HiSquare2Stack } from 'react-icons/hi2'
import { useDeleteCabin } from './useDeleteCabin'
import { formatCurrency } from '../../utils/helpers'
import { useCreateCabin } from './useCreateCabin'
import Spinner from '../../ui/Spinner'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateUpdateCabinForm from './CreateUpdateCabinForm'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { CabinType } from '../../types/cabin'

type Props = {
	cabin: CabinType
}

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`

function CabinRow({ cabin }: Props) {
	const { isDeleting, deleteCabinMutation } = useDeleteCabin()
	const { mutate: createCabinMutation } = useCreateCabin()

	const {
		id: cabinId,
		image,
		name,
		regularPrice,
		discount,
		maxCapacity,
		description,
	} = cabin

	async function handleDuplicateCabin() {
		try {
			// Fetch the image as a blob
			const response = await fetch(image.toString())
			const blob = await response.blob()

			// Create a new File object with a unique name
			const fileName = `${Date.now()}-${name
				.replace(/\s+/g, '-')
				.toLowerCase()}.${blob.type.split('/')[1]}`
			const imageFile = new File([blob], fileName, { type: blob.type })

			// Create the new cabin with the new image file
			createCabinMutation({
				name: `Копия ${name}`,
				image: imageFile,
				regularPrice,
				discount,
				maxCapacity,
				description,
			})
		} catch (error) {
			console.error('Error duplicating cabin:', error)
		}
	}

	if (isDeleting) return <Spinner />

	return (
		<Table.Row>
			<Img src={image.toString()} />
			<Cabin>{name}</Cabin>
			<div>Количество гостей: {maxCapacity}</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={cabinId?.toString()} />

					<Menus.List id={cabinId?.toString()}>
						<Menus.Button
							onClick={handleDuplicateCabin}
							icon={<HiSquare2Stack />}
						>
							<span>Копировать</span>
						</Menus.Button>

						<Modal.Open opens='edit'>
							{openModal => (
								<Menus.Button icon={<HiPencil />} onClick={openModal}>
									<span>Редактировать</span>
								</Menus.Button>
							)}
						</Modal.Open>

						<Modal.Open opens='delete'>
							{openModal => (
								<Menus.Button icon={<HiTrash />} onClick={openModal}>
									<span>Удалить</span>
								</Menus.Button>
							)}
						</Modal.Open>
					</Menus.List>

					<Modal.Window name='edit'>
						{closeModal => (
							<CreateUpdateCabinForm
								cabinToUpdate={cabin}
								onCloseModal={closeModal}
							/>
						)}
					</Modal.Window>

					<Modal.Window name='delete'>
						{closeModal => (
							<ConfirmDelete
								resourceName='номер'
								disabled={isDeleting}
								onConfirm={() => deleteCabinMutation(cabinId)}
								onCloseModal={closeModal}
							/>
						)}
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	)
}

export default CabinRow

	