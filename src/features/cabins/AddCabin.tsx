import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateUpdateCabinForm from './CreateUpdateCabinForm'

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens='cabin-form'>
				{openModal => <Button onClick={openModal}>Добавить номер</Button>}
			</Modal.Open>

			<Modal.Window name='cabin-form'>
				{closeModal => <CreateUpdateCabinForm onCloseModal={closeModal} />}
			</Modal.Window>
		</Modal>
	)
}

export default AddCabin