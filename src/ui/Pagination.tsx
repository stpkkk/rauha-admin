import styled from 'styled-components'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useSearchParams } from 'react-router-dom'

type PaginationProps = {
	numResults: number
}

type PaginationButtonProps = {
	active: any
}

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`

const PaginationButton = styled.button<PaginationButtonProps>`
	background-color: ${props =>
		props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
	color: ${props => (props.active ? ' var(--color-brand-50)' : 'inherit')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`
const PAGE_SIZE = 10

const Pagination = ({ numResults }: PaginationProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentPage = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'))

	const pageCount = Math.ceil(numResults / PAGE_SIZE)

	function nextPage() {
		const next = currentPage === pageCount ? currentPage : currentPage + 1

		setSearchParams(searchParams => {
			searchParams.set('page', next.toString())
			return searchParams
		})
	}

	function prevPage() {
		const prev = currentPage === 1 ? currentPage : currentPage - 1

		setSearchParams(searchParams => {
			searchParams.set('page', prev.toString())
			return searchParams
		})
	}

	if (pageCount <= 1) return null

	return (
		<StyledPagination>
			<P>
				Показаны результаты с <span>{(currentPage - 1) * PAGE_SIZE + 1}</span>{' '}
				по{' '}
				<span>
					{currentPage === pageCount ? numResults : currentPage * PAGE_SIZE}
				</span>{' '}
				из
				<span> {numResults}</span>
			</P>

			<Buttons>
				<PaginationButton
					active='false'
					onClick={prevPage}
					disabled={currentPage === 1}
				>
					<HiChevronLeft />
					<span>Предыдущие</span>
				</PaginationButton>
				<PaginationButton
					active='false'
					onClick={nextPage}
					disabled={currentPage === pageCount}
				>
					<span>Следующие</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	)
}
export default Pagination
