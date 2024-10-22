import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	type: 'white'
	children: ReactNode
}

const StyledSelect = styled.select<Props>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props =>
			props.type === 'white'
				? 'var(--color-grey-100)'
				: 'var(--color-grey-300)'};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`

const Select = ({ children, type }: Props) => {
	return <StyledSelect type={type}>{children}</StyledSelect>
}

export default Select
