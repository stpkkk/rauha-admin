import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'
import Heading from './ui/Heading'
import Row from './ui/Row'

const StyledApp = styled.div`
	padding: 20px;
`

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row type='vertical'>
					<Row type='horizontal'>
						<Heading as='h1'>Rauha</Heading>

						<div>
							<Heading as='h2'>Check in and out</Heading>

							<Button variation='primary' size='medium'>
								Check in
							</Button>
							<Button variation='secondary' size='small'>
								Check out
							</Button>
						</div>
					</Row>

					<Row type='vertical'>
						<Heading as='h3'>Form</Heading>
						<form>
							<Input type='text' placeholder='input' />
							<Input type='text' placeholder='input' />
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	)
}
export default App
