import { SettingType } from '../../types/setting'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
	const {
		isPending,
		error,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings()
	const { isUpdating, updateSettingMutation } = useUpdateSetting()

	function handleUpdate(
		e: React.FocusEvent<HTMLInputElement>,
		field: keyof SettingType
	) {
		const { value } = e.target

		if (!value) return

		updateSettingMutation({
			[field]: +value,
		} as SettingType)
	}

	if (isPending) return <Spinner />

	if (error) return 'An error has occurred: ' + error.message

	return (
		<Form>
			<FormRow label='Минимальное количество ночей для бронирования'>
				<Input
					type='number'
					id='min-nights'
					disabled={isUpdating}
					defaultValue={minBookingLength}
					onBlur={e => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>

			<FormRow label='Максимальное количество ночей для бронирования'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>

			<FormRow label='Максимальное количество гостей для бронирования'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>

			<FormRow label='Цена завтрака'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	)
}

export default UpdateSettingsForm
