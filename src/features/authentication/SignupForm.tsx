import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

type Inputs = {
	fullName: string
	email: string
	password: string
	passwordConfirm: string
}

function SignupForm() {
	const { register, handleSubmit, getValues, formState } = useForm<Inputs>()
	const { errors } = formState

	const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='ФИО' error={errors?.fullName?.message}>
				<Input
					type='text'
					id='fullName'
					{...register('fullName', {
						required: 'Это поле обязательное',
					})}
				/>
			</FormRow>

			<FormRow label='Email' error={errors?.email?.message}>
				<Input
					type='email'
					id='email'
					{...register('email', {
						required: 'Это поле обязательное',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Неправильно указана почта',
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
						validate: (value: string) =>
							value === getValues().password || 'Пароли не совпадают',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Отмена
				</Button>
				<Button type='submit'>Создать нового пользователя</Button>
			</FormRow>
		</Form>
	)
}

export default SignupForm
