import { HiOutlineSun } from 'react-icons/hi'
import ButtonIcon from './ButtonIcon'
import { useThemeToggle } from '../context/ThemeContext'
import { HiOutlineMoon } from 'react-icons/hi2'

const ThemeToggle = () => {
	const { isLightMode, toggleTheme } = useThemeToggle()

	return (
		<ButtonIcon onClick={toggleTheme}>
			{isLightMode ? <HiOutlineMoon /> : <HiOutlineSun />}
		</ButtonIcon>
	)
}
export default ThemeToggle
