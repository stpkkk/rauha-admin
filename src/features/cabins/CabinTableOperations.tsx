import styled from 'styled-components'
import Filter from '../../ui/Filter'

const TableOperations = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
`

const CabinTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				filterField='discount'
				options={[
					{ value: 'all', label: 'Все' },
					{ value: 'no-discount', label: 'Без Скидки' },
					{ value: 'with-discount', label: 'Со Скидкой' },
				]}
			/>
		</TableOperations>
	)
}
export default CabinTableOperations
