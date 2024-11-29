import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCabin } from '../../services/apiCabins'

export function useUpdateCabin() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateCabin,
		onSuccess: () => {
			toast.success('Домик обновлен')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error: Error) => toast.error(error.message),
	})
}
