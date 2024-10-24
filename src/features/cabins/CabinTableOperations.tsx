import styled from 'styled-components'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

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
			<SortBy
				options={[
					{ value: 'name-asc', label: 'По имени (А-Я)' },
					{ value: 'name-desc', label: 'По имени (Я-А)' },
					{ value: 'regularPrice-asc', label: 'По цене (дешевле)' },
					{ value: 'regularPrice-desc', label: 'По цене (дороже)' },
					{ value: 'maxCapacity-asc', label: 'Количество гостей (меньше)' },
					{ value: 'maxCapacity-desc', label: 'Количество гостей (больше)' },
				]}
			/>
		</TableOperations>
	)
}
export default CabinTableOperations
