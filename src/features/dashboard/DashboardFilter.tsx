import Filter from '../../ui/Filter'

function DashboardFilter() {
	return (
		<Filter
			filterField='last'
			options={[
				{ value: '7', label: 'За 7 дней' },
				{ value: '30', label: 'За 30 дней' },
				{ value: '90', label: 'За 90 дней' },
			]}
		/>
	)
}

export default DashboardFilter
