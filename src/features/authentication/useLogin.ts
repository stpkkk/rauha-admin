import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

type LoginParams = {
	email: string
	password: string
}

export function useLogin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: login, isPending: isPendingLogin } = useMutation({
		mutationFn: ({ email, password }: LoginParams) =>
			loginApi({ email, password }),

		onSuccess: user => {
			queryClient.setQueryData(['user'], user.user)
			navigate('/dashboard', { replace: true })
			console.log('user:', user)
		},

		onError: err => {
			console.log('ERROR:', err)
			toast.error('Неверный email или пароль!')
		},
	})

	return { login, isPendingLogin }
}
