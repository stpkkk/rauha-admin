import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type updateBookingParams = {
	bookingId: void
	breakfast:
		| {
				hasBreakfast: boolean
				extrasPrice: number
				totalPrice: number
		  }
		| {}
}

export function useCheckIn() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }: updateBookingParams) =>
			updateBooking(bookingId, {
				status: 'Заселился',
				isPaid: true,
				...breakfast,
			}),

		onSuccess: data => {
			toast.success(`Бронирование #${data.id} успешно зарегистрировано`)
			queryClient.invalidateQueries({ type: 'active' })
			navigate('/')
		},

		onError: () => toast.error('Ошибка при регистрации'),
	})

	return { checkIn, isCheckingIn }
}
