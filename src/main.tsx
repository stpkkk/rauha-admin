import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StyleSheetManager } from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StyleSheetManager shouldForwardProp={() => true}>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => window.location.replace('/')}
			>
				<App />
			</ErrorBoundary>
		</StyleSheetManager>
	</StrictMode>
)
