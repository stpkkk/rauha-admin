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
import { createCabin } from '../../services/apiCabins'

function CreateCabinForm() {
	const {
		handleSubmit,
		register,
		getValues,
		reset,
		formState: { errors },
	} = useForm<CabinType>()

	const queryClient = useQueryClient()

	const { mutate: createCabinMutation, isPending: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('Номер успешно создан!')

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
			reset()
		},
		onError: err => toast.error(err.message),
	})

	function onSubmit(data: CabinType) {
		createCabinMutation(data)
	}

	const onError = (errors: any) => {
		console.log('errors:', errors)
	}

	return (
		<Form type='modal' onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Название номера' error={errors?.name?.message} id='name'>
				<Input
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
					id='description'
					defaultValue=''
					{...register('description', {
						required: 'Это поле обязательно!',
					})}
				/>
			</FormRow>

			<FormRow label='Фото номера'>
				<FileInput id='image' accept='image/*' />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					size='medium'
					type='reset'
					disabled={isCreating}
				>
					Отмена
				</Button>
				<Button variation='primary' size='medium' disabled={isCreating}>
					Создать номер
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
