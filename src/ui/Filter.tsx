import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

type FilterProps = {
	filterField: string
	options: { value: string; label: string }[]
}

type FilterButtonProps = {
	active?: boolean
}

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`

const FilterButton = styled.button<FilterButtonProps>`
	background-color: var(--color-grey-0);
	border: none;

	${props =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`

const Filter = ({ filterField, options }: FilterProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentFilter = searchParams.get(filterField) || options.at(0)?.value

	function handleClick(value: string) {
		searchParams.set(filterField, value)
		setSearchParams(searchParams)
	}

	return (
		<StyledFilter>
			{options.map(option => (
				<FilterButton
					onClick={() => handleClick(option.value)}
					key={option.value}
					active={currentFilter === option.value}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	)
}
export default Filter

// const Filter = () => {
// 	const [searchParams, setSearchParams] = useSearchParams()

// 	function handleClick(value: string) {
// 		searchParams.set('discount', value)
// 		setSearchParams(searchParams)
// 	}

// 	return (
// 		<StyledFilter>
// 			<FilterButton onClick={() => handleClick('all')}>Все</FilterButton>
// 			<FilterButton onClick={() => handleClick('no-discount')}>
// 				Без скидки
// 			</FilterButton>
// 			<FilterButton onClick={() => handleClick('with-discount')}>
// 				Со скидкой
// 			</FilterButton>
// 		</StyledFilter>
// 	)
// }
// export default Filter
