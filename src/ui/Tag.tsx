import styled from 'styled-components'
import { TagName } from '../types/status'

type TagProps = {
	type: TagName
	children: React.ReactNode
}

const TagSpan = styled.span<TagProps>`
	width: fit-content;
	text-transform: uppercase;
	font-size: 1.1rem;
	font-weight: 600;
	padding: 0.4rem 1.2rem;
	border-radius: 100px;

	/* Make these dynamic, based on the received prop */
	color: var(--color-${props => props.type}-700);
	background-color: var(--color-${props => props.type}-100);
`
function Tag({ type, children }: TagProps) {
	return <TagSpan type={type}>{children}</TagSpan>
}

export default Tag
