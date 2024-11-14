import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import { useLogin } from './useLogin'
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
	const [email, setEmail] = useState('89535428863sia@gmail.com')
	const [password, setPassword] = useState('070166')

	const { login, isPendingLogin } = useLogin()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!email || !password) return

		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail('')
					setPassword('')
				},
			}
		)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label='Адрес почты:'>
				<Input
					type='email'
					id='email'
					// This makes this form better for password managers
					autoComplete='username'
					value={email}
					onChange={e => setEmail(e.target.value)}
					disabled={isPendingLogin}
				/>
			</FormRowVertical>

			<FormRowVertical label='Пароль:'>
				<Input
					type='password'
					id='password'
					autoComplete='current-password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					disabled={isPendingLogin}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size='large' disabled={isPendingLogin}>
					{!isPendingLogin ? 'Войти' : <SpinnerMini />}
				</Button>
			</FormRowVertical>
		</Form>
	)
}

export default LoginForm
