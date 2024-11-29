// onClick={() => onCloseModal?.()} - conditional call of function if handleCloseModal didn`t exist it will not be called and not create a bug

import { useForm } from 'react-hook-form'
import { useCreateCabin } from './useCreateCabin'
import { useUpdateCabin } from './useUpdateCabin'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import { CabinType } from '../../types/cabin'

type Props = {
	cabinToUpdate?: CabinType
	onCloseModal?: () => void
}

function CreateUpdateCabinForm({ cabinToUpdate, onCloseModal }: Props) {
	const { id: updateId, ...updatedValues } = cabinToUpdate || {}
	const isUpdateSession = Boolean(updateId)
	const { register, handleSubmit, reset, getValues, formState } =
		useForm<CabinType>({
			defaultValues: isUpdateSession ? updatedValues : {},
		})
	const { errors } = formState

	const createCabinMutation = useCreateCabin()
	const updateCabinMutation = useUpdateCabin()

	const { mutate, isPending } = isUpdateSession
		? updateCabinMutation
		: createCabinMutation

	const onSubmit = (formData: CabinType) => {
		if (
			!(formData.image instanceof FileList) &&
			typeof formData.image !== 'string'
		) {
			return
		}

		onCloseModal

		if (isUpdateSession) {
			mutate(
				{ ...formData, id: updateId },
				//reset inputs on success, also we can get data from Tanstack Query

				{
					onSuccess: data => {
						console.log('data:', data)
						reset()
						onCloseModal?.()
					},
				}
			)
		} else {
			mutate(
				{ ...formData, image: formData.image[0] },
				{
					onSuccess: () => {
						reset()
						onCloseModal?.()
					},
				}
			)
		}
	}

	const onError = (errors: Record<string, any>) => {
		console.log(errors)
	}

	return (
		<Form
			type={onCloseModal ? 'modal' : 'regular'}
			onSubmit={handleSubmit(onSubmit, onError)}
		>
			<FormRow label='Название домика' error={errors?.name?.message} id='name'>
				<Input
					disabled={isPending}
					type='text'
					id='name'
					{...register('name', {
						required: 'Это поле обязательно!',
					})}
				/>
			</FormRow>

			<FormRow
				label='Количество персон'
				error={errors?.maxCapacity?.message}
				id='maxCapacity'
			>
				<Input
					disabled={isPending}
					type='number'
					id='maxCapacity'
					{...register('maxCapacity', {
						required: 'Это поле обязательно!',
						min: {
							value: 1,
							message: 'Количество должно быть больше 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Стандартная цена'
				error={errors?.regularPrice?.message}
				id='regularPrice'
			>
				<Input
					disabled={isPending}
					type='number'
					id='regularPrice'
					{...register('regularPrice', {
						required: 'Это поле обязательно!',
						min: {
							value: 1,
							message: 'Количество должно быть больше 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Скидка' error={errors?.discount?.message} id='discount'>
				<Input
					disabled={isPending}
					type='number'
					id='discount'
					defaultValue={0}
					{...register('discount', {
						required: 'Это поле обязательно!',
						validate: (value: number) =>
							+value <= +getValues().regularPrice ||
							'Скидка должна быть меньше стандартной цены!',
					})}
				/>
			</FormRow>

			<FormRow
				label='Описание для домика'
				error={errors?.description?.message}
				id='description'
			>
				<Textarea
					disabled={isPending}
					id='description'
					defaultValue=''
					{...register('description', {
						required: 'Это поле обязательно!',
					})}
				/>
			</FormRow>

			<FormRow label='Фото домика'>
				<FileInput
					id='image'
					accept='image/*'
					type='file'
					{...register('image', {
						required: isUpdateSession ? false : 'Это поле обязательно!',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					onClick={() => onCloseModal?.()}
					variation='secondary'
					size='medium'
					type='reset'
					disabled={isPending}
				>
					Отмена
				</Button>
				<Button variation='primary' size='medium' disabled={isPending}>
					{isUpdateSession ? 'Редактировать домик' : 'Создать новый домик'}
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateUpdateCabinForm
