import { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateUpdateCabinForm from './CreateUpdateCabinForm'

const AddCabin = () => {
	const [isOpenModal, setIsOpenModal] = useState(false)

	return (
		<div>
			<Button
				onClick={() => setIsOpenModal(prev => !prev)}
				variation='primary'
				size='medium'
			>
				Добавить номер
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateUpdateCabinForm onCloseModal={() => setIsOpenModal(false)} />
				</Modal>
			)}
		</div>
	)
}
export default AddCabin
