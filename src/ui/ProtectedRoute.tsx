import { ReactNode, useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
	children: ReactNode
}

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate()
	//1. Load the authenticated user
	const { isPendingUser, isAuthenticated, isFetching } = useUser()

	//2. If NO authenticated user, redirect to the /login page
	useEffect(() => {
		if (!isAuthenticated && !isPendingUser && !isFetching) navigate('/login')
	}, [isAuthenticated, isPendingUser, navigate, isFetching])

	//3. While loading, show a spinner
	if (isPendingUser)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		)

	//4. If there IS a user, render the app
	if (isAuthenticated) return children
}
export default ProtectedRoute
