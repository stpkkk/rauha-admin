import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'

import { CabinType } from '../../types/cabin'
import { createCabin, updateCabin } from '../../services/apiCabins'

type Props = {
	cabinToEdit?: CabinType
}

function CreateEditCabinForm({ cabinToEdit }: Props) {
	const queryClient = useQueryClient()
	const { id: editId, ...editedValues } = cabinToEdit || {}
	const isEditSession = Boolean(editId)
	const { register, handleSubmit, reset, getValues, formState } =
		useForm<CabinType>({
			defaultValues: editId ? editedValues : {},
		})
	const { errors } = formState

	const createCabinMutation = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('New cabin created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: error => toast.error(error.message),
	})

	const updateCabinMutation = useMutation({
		mutationFn: updateCabin,
		onSuccess: () => {
			toast.success('Cabin updated')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: error => toast.error(error.message),
	})

	const { mutate, isPending } = editId
		? updateCabinMutation
		: createCabinMutation

	const onSubmit = (data: CabinType) => {
		if (!(data.image instanceof FileList) && typeof data.image !== 'string') {
			return
		}

		if (editId) {
			mutate(
				{ ...data, id: editId },
				{
					onSuccess: () => {
						reset()
					},
				}
			)
		} else {
			mutate(
				{ ...data, image: data.image[0] },
				{
					onSuccess: () => {
						reset()
					},
				}
			)
		}
	}

	const onError = (errors: any) => {
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
				label='Описание для сайта'
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
