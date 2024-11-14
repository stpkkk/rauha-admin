import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'

export function useUser() {
	const {
		data: user,
		isPending: isPendingUser,
		error,
		isFetching,
	} = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	})

	return {
		user,
		isPendingUser,
		error,
		isAuthenticated: user?.role === 'authenticated',
		isFetching,
	}
}
