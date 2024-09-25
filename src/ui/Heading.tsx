import styled, { css } from 'styled-components'

type Props = {
	type?: 'h1' | 'h2' | 'h3'
	as?: 'h1' | 'h2' | 'h3'
}

const Heading = styled.h1<Props>`
	${props =>
		props.type === 'h1' &&
		css`
			font-size: 3rem;
			font-weight: 600;
		`}

	${props =>
		props.type === 'h2' &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}

	${props =>
		props.type === 'h3' &&
		css`
			font-size: 2rem;
			font-weight: 500;
		`}

	line-height: 1.4;
`
export default Heading
