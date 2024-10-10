export type CabinType = {
	id?: number
	created_at?: Date
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	image: string | File | FileList
}
