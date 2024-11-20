import styled from 'styled-components'

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`
const DashboardLayout = () => {
	return (
		<StyledDashboardLayout>
			<div>Статистика</div>
			<div>Активность за сегодня</div>
			<div>График прибывания в отеле</div>
			<div>График скидок</div>
		</StyledDashboardLayout>
	)
}

export default DashboardLayout
