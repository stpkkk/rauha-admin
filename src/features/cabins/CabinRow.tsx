import styled from 'styled-components'
import { CabinType } from '../../types/cabin'
import { formatCurrency } from '../../utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Spinner from '../../ui/Spinner'
import { deleteCabin } from '../../services/apiCabins'
import Button from '../../ui/Button'
import toast from 'react-hot-toast'

type CabinRowType = {
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

function CabinRow({ cabin }: CabinRowType) {
	const {
		id: cabinId,
		image,
		name,
		regularPrice,
		discount,
		maxCapacity,
	} = cabin

	const queryClient = useQueryClient()

	const { mutate: deleteCabinMutation, isPending } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Номер успешно удален!')

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
		},
		onError: err => toast.error(err.message),
	})

	function handleDeleteCabin() {
		deleteCabinMutation(cabinId)
	}

	if (isPending) return <Spinner />

	return (
		<TableRow role='row'>
			<Img src={image} alt={name} />
			<Cabin>{name}</Cabin>
			<div>Количество персон: {maxCapacity}</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			<Discount>{formatCurrency(discount)}</Discount>
			<Button
				size='small'
				variation='danger'
				onClick={handleDeleteCabin}
				disabled={isPending}
			>
				Удалить
			</Button>
		</TableRow>
	)
}

export default CabinRow