import CabinRow from './CabinRow'
import { CabinType } from '../../types/cabin'
import Spinner from '../../ui/Spinner'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'

function CabinTable() {
	const [searchParams] = useSearchParams()
	const { isPending, error, cabins } = useCabins()

	const filterValue = searchParams.get('discount') || 'all'

	let filteredCabins
	if (filterValue === 'all') filteredCabins = cabins
	if (filterValue === 'no-discount')
		filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
	if (filterValue === 'with-discount')
		filteredCabins = cabins?.filter(cabin => cabin.discount > 0)

	if (isPending) return <Spinner />

	if (error) return 'An error has occurred: ' + error.message

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div></div>
					<div>Номер</div>
					<div>Вместимость</div>
					<div>Цена</div>
					<div>Скидка</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={filteredCabins || []}
					render={(cabin: CabinType) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	)
}
export default CabinTable
