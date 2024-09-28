import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	border-right: solid 1px var(--color-grey-300);
	padding: 3.2rem 2.4rem;
	grid-row: 1 / -1;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`

const Sidebar = () => {
	return (
		<StyledSidebar>
			<Logo />
			<MainNav />
		</StyledSidebar>
	)
}
export default Sidebar
