import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'

export const useTodayActivity = () => {
	const { isPending, data: activities } = useQuery({
		queryFn: getStaysTodayActivity,
		queryKey: ['today-activity'],
	})

	return { activities, isPending }
}
