import { SubmitHandler, useForm } from 'react-hook-form'
import { useSignup } from './useSignup'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

type Inputs = {
	fullName: string
	email: string
	password: string
	passwordConfirm?: string
}

function SignupForm() {
	const { signup, isPendingSignup } = useSignup()
	const { register, handleSubmit, getValues, formState, reset } =
		useForm<Inputs>()
	const { errors } = formState

	const onSubmit: SubmitHandler<Inputs> = ({
		fullName,
		email,
		password,
	}: Inputs) => {
		signup(
			{
				fullName,
				email,
				password,
			},
			{
				onSettled: (_data, error) => {
					if (!error) {
						reset()
					}
				},
			}
		)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='ФИО' error={errors?.fullName?.message}>
				<Input
					type='text'
					id='fullName'
					disabled={isPendingSignup}
					{...register('fullName', {
						required: 'Это поле обязательное',
					})}
				/>
			</FormRow>

			<FormRow label='Email' error={errors?.email?.message}>
				<Input
					type='email'
					id='email'
					disabled={isPendingSignup}
					{...register('email', {
						required: 'Это поле обязательное',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Неправильно указан email',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Пароль (минимум 8 знаков)'
				error={errors?.password?.message}
			>
				<Input
					type='password'
					id='password'
					disabled={isPendingSignup}
					{...register('password', {
						required: 'Это поле обязательное',
						minLength: {
							value: 8,
							message: 'Пароль должен быть не меньше 8 символов',
						},
						maxLength: 20,
					})}
				/>
			</FormRow>

			<FormRow
				label='Повторите пароль'
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type='password'
					id='passwordConfirm'
					{...register('passwordConfirm', {
						validate: (value?: string) =>
							value === getValues().password || 'Пароли не совпадают',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset' disabled={isPendingSignup}>
					Отмена
				</Button>
				<Button type='submit' disabled={isPendingSignup}>
					Создать нового пользователя
				</Button>
			</FormRow>
		</Form>
	)
}

export default SignupForm
