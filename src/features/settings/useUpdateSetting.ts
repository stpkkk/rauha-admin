import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateSetting } from '../../services/apiSettings'

export function useUpdateSetting() {
	const queryClient = useQueryClient()

	const { isPending: isUpdating, mutate: updateSettingMutation } = useMutation({
		mutationFn: updateSetting,
		onSuccess: () => {
			toast.success('Setting updated')
			queryClient.invalidateQueries({ queryKey: ['settings'] })
		},
		onError: (error: Error) => toast.error(error.message),
	})

	return { isUpdating, updateSettingMutation }
}
