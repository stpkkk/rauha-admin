import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { updateCurrentUser } from '../../services/apiAuth'

export function useUpdateUser() {
	const queryClient = useQueryClient()

	const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: user => {
			queryClient.setQueryData(['user'], user?.user)

			toast.success('Пользователь успешно обновлен!')
		},
		onError: err => toast.error(err.message),
	})

	return { updateUser, isUpdatingUser }
}
