import styled from 'styled-components'
import { useDeleteCabin } from './useDeleteCabin'
import Spinner from '../../ui/Spinner'
import { formatCurrency } from '../../utils/helpers'
import { CabinType } from '../../types/cabin'
import { HiSquare2Stack } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import { HiPencil, HiTrash } from 'react-icons/hi'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import CreateUpdateCabinForm from './CreateUpdateCabinForm'

type Props = {
	cabin: CabinType
}

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`

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
	const { mutate: createCabinMutation, isPending: isCreating } =
		useCreateCabin()

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
		<TableRow role='row'>
			<Img src={image.toString()} alt={name} />
			<Cabin>{name}</Cabin>
			<div>Количество персон: {maxCapacity}</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<button onClick={handleDuplicateCabin} disabled={isCreating}>
					<HiSquare2Stack />
				</button>

				<Modal>
					<Modal.Open opens='edit'>
						{openModal => (
							<button onClick={openModal}>
								<HiPencil />
							</button>
						)}
					</Modal.Open>
					<Modal.Window name='edit'>
						{closeModal => (
							<CreateUpdateCabinForm
								cabinToUpdate={cabin}
								onCloseModal={closeModal}
							/>
						)}
					</Modal.Window>

					<Modal.Open opens='delete'>
						{openModal => (
							<button onClick={openModal}>
								<HiTrash />
							</button>
						)}
					</Modal.Open>
					<Modal.Window name='delete'>
						{closeModal => (
							<ConfirmDelete
								resourceName='домик'
								disabled={isDeleting}
								onConfirm={() => deleteCabinMutation(cabinId)}
								onCloseModal={closeModal}
							/>
						)}
					</Modal.Window>
				</Modal>
			</div>
		</TableRow>
	)
}

export default CabinRow
