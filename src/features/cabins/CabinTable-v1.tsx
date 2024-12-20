import styled from 'styled-components'
import CabinRow from './CabinRow'
import { CabinType } from '../../types/cabin'
import Spinner from '../../ui/Spinner'
import { useCabins } from './useCabins'

const Table = styled.div`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`

function CabinTable() {
	const { isPending, error, cabins } = useCabins()

	if (isPending) return <Spinner />

	if (error) return 'An error has occurred: ' + error.message

	return (
		<Table role='table'>
			<TableHeader role='row'>
				<div></div>
				<div>Домик</div>
				<div>Вместимость</div>
				<div>Цена</div>
				<div>Скидка</div>
				<div></div>
			</TableHeader>
			{cabins?.map((cabin: CabinType) => (
				<CabinRow cabin={cabin} key={cabin.id} />
			))}
		</Table>
	)
}
export default CabinTable
