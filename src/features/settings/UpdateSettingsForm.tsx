import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'

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

	if (isPending) return <Spinner />

	if (error) return 'An error has occurred: ' + error.message

	return (
		<Form>
			<FormRow label='Минимальное количество ночей для бронирования'>
				<Input type='number' id='min-nights' defaultValue={minBookingLength} />
			</FormRow>
			<FormRow label='Максимальное количество ночей для бронирования'>
				<Input type='number' id='max-nights' defaultValue={maxBookingLength} />
			</FormRow>
			<FormRow label='Максимальное количество гостей для бронирования'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maxGuestsPerBooking}
				/>
			</FormRow>
			<FormRow label='Цена завтрака'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
				/>
			</FormRow>
		</Form>
	)
}

export default UpdateSettingsForm
