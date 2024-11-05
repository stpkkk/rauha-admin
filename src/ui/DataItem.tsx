import { ReactNode } from 'react'
import styled from 'styled-components'

type DataItemProps = {
	icon: ReactNode
	children: ReactNode
	label: string
}

const StyledDataItem = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	padding: 0.8rem 0;
`

const Label = styled.span`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	font-weight: 500;

	& svg {
		width: 2rem;
		height: 2rem;
		color: var(--color-brand-600);
	}
`

function DataItem({ icon, label, children }: DataItemProps) {
	return (
		<StyledDataItem>
			<Label>
				{icon}
				<span>{label}</span>
			</Label>
			{children}
		</StyledDataItem>
	)
}

export default DataItem
