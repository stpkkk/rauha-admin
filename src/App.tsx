import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Login from './pages/Login'
import NewUsers from './pages/Users'
import Account from './pages/Account'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'
import { Toaster } from 'react-hot-toast'
import BookingDetail from './features/bookings/BookingDetail'
import CheckIn from './pages/CheckIn'
import ProtectedRoute from './ui/ProtectedRoute'
import { ThemeProvider } from './context/ThemeContext'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
})

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to='dashboard' />} />
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='account' element={<Account />} />
							<Route path='users' element={<NewUsers />} />
							<Route path='cabins' element={<Cabins />} />
							<Route path='bookings' element={<Bookings />} />
							<Route path='bookings/:id' element={<BookingDetail />} />
							<Route path='check-in/:id' element={<CheckIn />} />
							<Route path='settings' element={<Settings />} />
						</Route>

						<Route path='login' element={<Login />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>

				<Toaster
					position='top-center'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24xp',
							backgroundColor: 'var(--color-grey-100)',
						},
					}}
				/>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
export default App
