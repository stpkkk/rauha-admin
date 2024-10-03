import { CabinType } from '../types/cabin'
import supabase from './supabase'

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be loaded')
	}

	return data
}

export async function deleteCabin(id?: number | string) {
	const { error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be deleted')
	}
}

export async function createCabin(newCabin: CabinType) {
	const { data, error } = await supabase
		.from('cabins')
		.insert([newCabin])
		.select()

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be created')
	}

	return data
}
