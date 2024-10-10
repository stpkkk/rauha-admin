import { useForm } from 'react-hook-form'
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'
import { CabinType } from '../../types/cabin'

type Props = {
	cabinToEdit?: CabinType
}

function CreateEditCabinForm({ cabinToEdit }: Props) {
	const { id: editId, ...editedValues } = cabinToEdit || {}
	const isEditSession = Boolean(editId)
	const { register, handleSubmit, reset, getValues, formState } =
		useForm<CabinType>({
			defaultValues: isEditSession ? editedValues : {},
		})
	const { errors } = formState

	const createCabinMutation = useCreateCabin()
	const updateCabinMutation = useEditCabin()

	const { mutate, isPending } = isEditSession
		? updateCabinMutation
		: createCabinMutation

	const onSubmit = (formData: CabinType) => {
		if (
			!(formData.image instanceof FileList) &&
			typeof formData.image !== 'string'
		) {
			return
		}

		if (isEditSession) {
			mutate(
				{ ...formData, id: editId },
				//reset inputs on success, also we can get data from Tanstack Query
				{
					onSuccess: data => {
						console.log('data:', data)
						reset()
					},
				}
			)
		} else {
			mutate(
				{ ...formData, image: formData.image[0] },
				{
					onSuccess: () => {
						reset()
					},
				}
			)
		}
	}

	const onError = (errors: Record<string, any>) => {
		console.log(errors)
	}

	return (
		<Form type='modal' onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Название номера' error={errors?.name?.message} id='name'>
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
				label='Описание для номера'
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

			<FormRow label='Фото номера'>
				<FileInput
					id='image'
					accept='image/*'
					type='file'
					{...register('image', {
						required: isEditSession ? false : 'Это поле обязательно!',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					size='medium'
					type='reset'
					disabled={isPending}
				>
					Отмена
				</Button>
				<Button variation='primary' size='medium' disabled={isPending}>
					{isEditSession ? 'Редактировать номер' : 'Создать новый номер'}
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateEditCabinForm
