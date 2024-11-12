import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateBooking } from '../../services/apiBookings'

export function useCheckOut() {
	const queryClient = useQueryClient()

	const { mutate: checkOutMutation, isPending: isCheckingOut } = useMutation({
		mutationFn: (bookingId: number) =>
			updateBooking(bookingId, {
				status: 'Выселился',
			}),

		onSuccess: () => {
			toast.success('Бронирование успешно удалено!')
			queryClient.invalidateQueries({
				queryKey: ['booking'],
			})
		},
		onError: err => toast.error(err.message),
	})

	return { isCheckingOut, checkOutMutation }
}
