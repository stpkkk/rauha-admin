import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'

const H1 = styled.h1`
	font-size: 30px;
	font-weight: 600;
	background-color: rebeccapurple;
`

const StyledApp = styled.div`
	background-color: palegreen;
	padding: 20px;
`

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<H1>App</H1>
				<Input type='text' placeholder='input' />
				<Button>Check in</Button>
			</StyledApp>
		</>
	)
}
export default App
