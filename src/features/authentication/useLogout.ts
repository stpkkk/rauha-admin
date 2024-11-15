import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useLogout() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: logout, isPending: isPendingLogout } = useMutation({
		mutationFn: logoutApi,

		onSuccess: user => {
			// remove React Query cache
			queryClient.removeQueries()
			// { replace: true } - to erase(стереть) the place that we were earlier, otherwise browser going back button is not gonna work
			navigate('/login', { replace: true })
			console.log('user:', user)
		},

		onError: err => {
			console.log('ERROR:', err)
			toast.error('Ошибка! Не получилось выйти из аккаунта!')
		},
	})

	return { logout, isPendingLogout }
}
