import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createCabin } from '../../services/apiCabins'

export function useCreateCabin() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success('New cabin created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error: Error) => toast.error(error.message),
	})
}
