import styled from 'styled-components'

const StyledLogo = styled.div`
	text-align: center;
`

const StyledImg = styled.img`
	height: 9.6rem;
	width: auto;
	border-radius: 50%;
`

function Logo() {
	return (
		<StyledLogo>
			<StyledImg src='/logo-light.webp' alt='Logo' />
		</StyledLogo>
	)
}

export default Logo
