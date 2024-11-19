import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm'
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Account() {
	return (
		<>
			<Heading as='h1'>Обновить аккаунт</Heading>

			<Row type='vertical'>
				<Heading as='h3'>Обновить данные пользователя</Heading>
				<UpdateUserDataForm />
			</Row>

			<Row type='vertical'>
				<Heading as='h3'>Обновить пароль</Heading>
				<UpdatePasswordForm />
			</Row>
		</>
	)
}

export default Account
