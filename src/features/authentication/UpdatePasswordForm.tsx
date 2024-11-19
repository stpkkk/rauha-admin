import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateUser } from './useUpdateUser'

type Inputs = {
	password: string
	passwordConfirm?: string
}

function UpdatePasswordForm() {
	const { register, handleSubmit, formState, getValues, reset } =
		useForm<Inputs>()
	const { errors } = formState

	const { updateUser, isUpdatingUser } = useUpdateUser()

	function onSubmit({ password }: Inputs) {
		updateUser({ password }, { onSuccess: () => reset() })
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label='Новый пароль (минимум 8 символов):'
				error={errors?.password?.message}
			>
				<Input
					type='password'
					id='password'
					autoComplete='current-password'
					disabled={isUpdatingUser}
					{...register('password', {
						required: 'Это поле обязательное!',
						minLength: {
							value: 8,
							message: 'Новый пароль должен содержать не меньше 8 символов!',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Подтвердите пароль:'
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type='password'
					autoComplete='new-password'
					id='passwordConfirm'
					disabled={isUpdatingUser}
					{...register('passwordConfirm', {
						required: 'Это поле обязательное!',
						validate: value =>
							getValues().password === value || 'Пароли должны совпадать!',
					})}
				/>
			</FormRow>
			<FormRow>
				<Button onClick={() => reset} type='reset' variation='secondary'>
					Отмена
				</Button>
				<Button disabled={isUpdatingUser}>Обновить пароль</Button>
			</FormRow>
		</Form>
	)
}

export default UpdatePasswordForm
