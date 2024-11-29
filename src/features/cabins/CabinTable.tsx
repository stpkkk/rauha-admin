import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import { CabinType } from '../../types/cabin'
import Empty from '../../ui/Empty'

function CabinTable() {
	const [searchParams] = useSearchParams()
	const { isPending, error, cabins } = useCabins()

	// 1) FILTER
	const filterValue = searchParams.get('discount') || 'all'

	let filteredCabins
	if (filterValue === 'all') filteredCabins = cabins
	if (filterValue === 'no-discount')
		filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
	if (filterValue === 'with-discount')
		filteredCabins = cabins?.filter(cabin => cabin.discount > 0)

	// 2) SORTBY
	const sortBy = searchParams.get('sortBy') || 'name-asc'
	const [field, direction] = sortBy.split('-')
	const modifier = direction === 'asc' ? 1 : -1
	const sortedCabins = filteredCabins?.sort((a, b) =>
		typeof a[field] === 'string'
			? a[field].localeCompare(b[field]) * modifier
			: (a[field] - b[field]) * modifier
	)

	if (isPending) return <Spinner />
	if (error) return 'An error has occurred: ' + error.message
	if (!cabins?.length) return <Empty resourceName='домики' />

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div></div>
					<div>Домик</div>
					<div>Вместимость</div>
					<div>Цена</div>
					<div>Скидка</div>
					<div></div>
				</Table.Header>

				<Table.Body<CabinType>
					data={sortedCabins || []}
					render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
				/>
			</Table>
		</Menus>
	)
}

export default CabinTable
