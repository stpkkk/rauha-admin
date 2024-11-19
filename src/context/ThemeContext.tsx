import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

type ThemeContextType = {
	isLightMode: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

function ThemeProvider({ children }: { children: ReactNode }) {
	const [isLightMode, setIsLightMode] = useLocalStorageState(
		false,
		'isLightMode'
	)

	useEffect(() => {
		if (isLightMode) {
			document.documentElement.classList.add('light-mode')
			document.documentElement.classList.remove('dark-mode')
		} else {
			document.documentElement.classList.add('dark-mode')
			document.documentElement.classList.remove('light-mode')
		}
	}, [isLightMode])

	function toggleTheme() {
		setIsLightMode((theme: boolean) => !theme)
	}

	return (
		<ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

function useThemeToggle(): ThemeContextType {
	const context = useContext(ThemeContext)

	if (context === null) {
		throw new Error('useThemeToggle must be used within a ThemeProvider')
	}

	return context
}

export { ThemeProvider, useThemeToggle }
