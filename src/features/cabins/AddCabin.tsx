import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateUpdateCabinForm from './CreateUpdateCabinForm'

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens='cabin-form'>
				<Button>Добавить номер</Button>
			</Modal.Open>

			<Modal.Window name='cabin-form'>
				<CreateUpdateCabinForm />
			</Modal.Window>
		</Modal>
	)
}

export default AddCabin
