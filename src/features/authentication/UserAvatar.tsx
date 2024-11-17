import styled from 'styled-components'
import { useUser } from './useUser'

const StyledUserAvatar = styled.div`
	display: flex;
	gap: 1.2rem;
	align-items: center;
	font-weight: 500;
	font-size: 1.4rem;
	color: var(--color-grey-600);
`

const Avatar = styled.img`
	display: block;
	width: 4rem;
	height: 3.6rem;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	outline: 2px solid var(--color-grey-100);
`
const UserAvatar = () => {
	const { user } = useUser()

	const fullName = user?.user_metadata?.fullName
	const avatar = user?.user_metadata?.avatar

	return (
		<StyledUserAvatar>
			<Avatar
				src={avatar || 'default-user.jpg'}
				alt={`Avatar of ${fullName || 'user'}`}
			/>
			<span>{fullName || 'user name'}</span>
		</StyledUserAvatar>
	)
}

export default UserAvatar
