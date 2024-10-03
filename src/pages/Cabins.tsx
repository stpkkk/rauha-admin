import { useState } from 'react'
import CabinTable from '../features/cabins/CabinTable'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CreateCabinForm from '../features/cabins/CreateCabinForm'

function Cabins() {
	const [showForm, setShowForm] = useState(false)

	return (
		<>
			<Row>
				<Heading as='h1'>Номера</Heading>
				<p>Фильтрация / Сортировка</p>
			</Row>

			<Row type='vertical'>
				<CabinTable />
				<Button
					onClick={() => setShowForm(prev => !prev)}
					variation='primary'
					size='medium'
				>
					Добавить номер
				</Button>
			</Row>

			{showForm && <CreateCabinForm />}
		</>
	)
}

export default Cabins
