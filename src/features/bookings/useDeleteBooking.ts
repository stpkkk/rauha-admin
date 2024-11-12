import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteBooking } from '../../services/apiBookings'

export function useDeleteBooking() {
	const queryClient = useQueryClient()

	const { mutate: deleteBookingMutation, isPending: isDeleting } = useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success('Бронирование успешно удалено!')

			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			})
		},
		onError: err => toast.error(err.message),
	})

	return { isDeleting, deleteBookingMutation }
}
