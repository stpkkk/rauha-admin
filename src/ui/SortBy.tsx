import { useSearchParams } from 'react-router-dom'
import Select from './Select'

type SortProps = {
	options: { value: string; label: string }[]
}

const SortBy = ({ options }: SortProps) => {
	//!TODO Create custom useUrl Hook
	const [searchParams, setSearchParams] = useSearchParams()
	const currentSortBy = searchParams.get('sortBy') || options.at(0)?.value

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const value = event.target.value

		searchParams.set('sortBy', value)
		setSearchParams(searchParams)
	}

	return (
		<Select
			options={options}
			type='white'
			value={currentSortBy}
			onChange={handleChange}
		/>
	)
}
export default SortBy
