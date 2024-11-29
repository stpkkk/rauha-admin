import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteCabin } from '../../services/apiCabins'

export function useDeleteCabin() {
	const queryClient = useQueryClient()

	const { mutate: deleteCabinMutation, isPending: isDeleting } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Домик успешно удален!')

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
		},
		onError: err => toast.error(err.message),
	})

	return { isDeleting, deleteCabinMutation }
}
