import CabinTable from '../features/cabins/CabinTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Cabins() {
	return (
		<>
			<Row>
				<Heading as='h1'>Номера</Heading>
				<p>Фильтрация / Сортировка</p>
			</Row>

			<CabinTable />
		</>
	)
}

export default Cabins
