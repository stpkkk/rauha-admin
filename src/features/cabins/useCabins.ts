import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export function useCabins() {
	const {
		isPending,
		error,
		data: cabins,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	})

	return { isPending, error, cabins }
}
