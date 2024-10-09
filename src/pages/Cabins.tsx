import { useState } from 'react'
import CabinTable from '../features/cabins/CabinTable'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CreateEditCabinForm from '../features/cabins/CreateEditCabinForm'

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
				<div>
					<Button
						onClick={() => setShowForm(prev => !prev)}
						variation='primary'
						size='medium'
					>
						Добавить номер
					</Button>
				</div>
			</Row>

			{showForm && <CreateEditCabinForm />}
		</>
	)
}

export default Cabins
