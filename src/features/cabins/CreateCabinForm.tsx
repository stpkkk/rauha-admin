import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CabinType } from '../../types/cabin'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Spinner from '../../ui/Spinner'

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`

const Label = styled.label`
	font-weight: 500;
`

// const Error = styled.span`
// 	font-size: 1.4rem;
// 	color: var(--color-red-700);
// `

function CreateCabinForm() {
	const {
		handleSubmit,
		register,
		reset,
		// formState: { errors },
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

	const onSubmit: SubmitHandler<CabinType> = (data: CabinType) => {
		createCabinMutation(data)
	}

	if (isCreating) return <Spinner />

	return (
		<Form type='modal' onSubmit={handleSubmit(onSubmit)}>
			<FormRow>
				<Label htmlFor='name'>Название номера</Label>
				<Input type='text' id='name' {...register('name')} />
			</FormRow>

			<FormRow>
				<Label htmlFor='maxCapacity'>Количество персон</Label>
				<Input type='number' id='maxCapacity' {...register('maxCapacity')} />
			</FormRow>

			<FormRow>
				<Label htmlFor='regularPrice'>Стандартная цена</Label>
				<Input type='number' id='regularPrice' {...register('regularPrice')} />
			</FormRow>

			<FormRow>
				<Label htmlFor='discount'>Скидка</Label>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					{...register('discount')}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor='description'>Описание для сайта</Label>
				<Textarea
					id='description'
					defaultValue=''
					{...register('description')}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor='image'>Фото номера </Label>
				<FileInput id='image' accept='image/*' />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' size='medium' type='reset'>
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
