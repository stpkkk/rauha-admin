import { HiOutlineLogout } from 'react-icons/hi'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './useLogout'

function Logout() {
	const { logout, isPendingLogout } = useLogout()

	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		logout()
	}

	return (
		<ButtonIcon onClick={handleLogout} disabled={isPendingLogout}>
			{!isPendingLogout ? <HiOutlineLogout /> : <SpinnerMini />}
		</ButtonIcon>
	)
}
export default Logout
