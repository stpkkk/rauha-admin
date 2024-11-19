import { useState } from 'react'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUser } from './useUser'
import { useUpdateUser } from './useUpdateUser'

function UpdateUserDataForm() {
	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const { user } = useUser()
	const { updateUser, isUpdatingUser } = useUpdateUser()
	const currentFullName = user?.user_metadata?.fullName || ''

	const [fullName, setFullName] = useState(currentFullName)
	const [avatar, setAvatar] = useState<File | null>(null)

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!fullName) return
		updateUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null), (e.target as HTMLFormElement).reset()
				},
			}
		)
	}

	function handleCancel() {
		setFullName(user?.user_metadata?.fullName)
		setAvatar(null)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label='Email:'>
				<Input value={user?.email || ''} disabled />
			</FormRow>

			<FormRow label='ФИО:'>
				<Input
					type='text'
					value={fullName}
					onChange={e => setFullName(e.target.value)}
					id='fullName'
					disabled={isUpdatingUser}
				/>
			</FormRow>

			<FormRow label='Фото:'>
				<FileInput
					id='avatar'
					accept='image/*'
					onChange={e => setAvatar(e.target.files?.[0] || null)}
					disabled={isUpdatingUser}
				/>
			</FormRow>

			<FormRow>
				<Button
					type='reset'
					variation='secondary'
					disabled={isUpdatingUser}
					onClick={handleCancel}
				>
					Отмена
				</Button>
				<Button disabled={isUpdatingUser}>Обновить аккаунт</Button>
			</FormRow>
		</Form>
	)
}

export default UpdateUserDataForm
