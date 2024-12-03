import { IoMdLogOut } from 'react-icons/io'
import { useCheckOut } from './useCheckOut'
import styled from 'styled-components'

type CheckoutButtonProps = {
	bookingId: number
}

const Button = styled.button`
	border: none;
	background: transparent;
	box-shadow: none;
	text-align: start;
`

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
	const { checkOutMutation, isCheckingOut } = useCheckOut()

	return (
		<Button
			onClick={() => checkOutMutation(bookingId)}
			disabled={isCheckingOut}
			title='Выселить'
		>
			<IoMdLogOut size={20} color='red' />
		</Button>
	)
}

export default CheckoutButton
