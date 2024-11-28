import styled from 'styled-components'
import { BookingType } from '../../types/booking'
import Heading from '../../ui/Heading'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'
import { useThemeToggle } from '../../context/ThemeContext'

interface DurationChartProps {
	confirmedStays?: BookingType[]
}

const ChartBox = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`

interface ChartData {
	duration: string
	value: number
	color: string
}

const startDataLight: ChartData[] = [
	{
		duration: '1 night',
		value: 0,
		color: '#ef4444',
	},
	{
		duration: '2 nights',
		value: 0,
		color: '#f97316',
	},
	{
		duration: '3 nights',
		value: 0,
		color: '#eab308',
	},
	{
		duration: '4-5 nights',
		value: 0,
		color: '#84cc16',
	},
	{
		duration: '6-7 nights',
		value: 0,
		color: '#22c55e',
	},
	{
		duration: '8-14 nights',
		value: 0,
		color: '#14b8a6',
	},
	{
		duration: '15-21 nights',
		value: 0,
		color: '#3b82f6',
	},
	{
		duration: '21+ nights',
		value: 0,
		color: '#a855f7',
	},
]

const startDataDark: ChartData[] = [
	{
		duration: '1 night',
		value: 0,
		color: '#b91c1c',
	},
	{
		duration: '2 nights',
		value: 0,
		color: '#c2410c',
	},
	{
		duration: '3 nights',
		value: 0,
		color: '#a16207',
	},
	{
		duration: '4-5 nights',
		value: 0,
		color: '#4d7c0f',
	},
	{
		duration: '6-7 nights',
		value: 0,
		color: '#15803d',
	},
	{
		duration: '8-14 nights',
		value: 0,
		color: '#0f766e',
	},
	{
		duration: '15-21 nights',
		value: 0,
		color: '#1d4ed8',
	},
	{
		duration: '21+ nights',
		value: 0,
		color: '#7e22ce',
	},
]

function prepareData(
	startData: ChartData[],
	stays: BookingType[]
): ChartData[] {
	//this function prepares the startData array based on the stays array and returns a refined startData array.

	function checkIsInRange(from: number, to: number, number: number): boolean {
		return from <= number && to >= number
		//the function checks if the number is between from and to, returns a boolean
	}

	function incArrayValue(arr: ChartData[], nights: number): ChartData[] {
		//for each stay, incArrayValue loops over every element in startData(arr) and update the related value in startData in return.

		//A. the map function finds out the value of from and to
		return arr.map(obj => {
			const [from, to = from] = obj.duration
				.replace(/[^0-9-]/g, '')
				.split('-')
				.map(Number)
			//1. [^0-9-]: Matches any character that is not (0-9) or (-).
			//2. /.../g: Flags the regular expression for global search and replacement.
			//3. after split, we get two numbers, first one assigned to "from", second one assigned to "to; if we only got one number then to = from as default

			//B. find out which duration this stay.numNights fall in
			const isInRange = checkIsInRange(from, to, nights)

			//C. update matched duration value
			return isInRange ? { ...obj, value: obj.value + 1 } : obj
		})
	}

	const data = stays
		.reduce((arr, cur) => incArrayValue(arr, cur.numNights), startData)
		//arr in reduce is the accumulator that collects the updated startData after each iteration,
		//arr is passed to incArrayValue for increment(value +1)
		.filter(obj => obj.value > 0)

	return data
}

function DurationChart({ confirmedStays = [] }: DurationChartProps) {
	const { isLightMode } = useThemeToggle()

	const startData = isLightMode ? startDataLight : startDataDark
	const data = prepareData(startData, confirmedStays)

	return (
		<ChartBox>
			<Heading as='h2'>Количество забронированных дней</Heading>

			<ResponsiveContainer width='100%' height='80%'>
				<PieChart>
					<Pie
						nameKey='duration'
						dataKey='value'
						data={data}
						innerRadius='70%'
						outerRadius='90%'
						cx='40%'
						cy='50%'
						paddingAngle={3}
					>
						{data.map(entry => (
							<Cell
								fill={entry.color}
								stroke={entry.color}
								key={entry.duration}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend
						layout='vertical'
						verticalAlign='middle'
						align='right'
						iconType='circle'
						iconSize={15}
						formatter={value => ` ${value}`}
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	)
}

export default DurationChart
