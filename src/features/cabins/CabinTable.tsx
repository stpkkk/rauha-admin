import CabinRow from './CabinRow'
import { CabinType } from '../../types/cabin'
import Spinner from '../../ui/Spinner'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

function CabinTable() {
	const { isPending, error, cabins } = useCabins()

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
					data={cabins || []}
					render={(cabin: CabinType) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	)
}
export default CabinTable
