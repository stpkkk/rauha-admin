export type Status = 'не подтверждено' | 'заселился' | 'выселился'
export type TagName = 'blue' | 'green' | 'silver'

export const statusToTagName: { [K in Status]: TagName } = {
	'не подтверждено': 'blue',
	заселился: 'green',
	выселился: 'silver',
}

export function isStatus(status: string): status is Status {
	return status in statusToTagName
}
