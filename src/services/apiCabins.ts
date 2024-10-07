import { CabinType } from '../types/cabin'
import supabase, { supabaseUrl } from './supabase'

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
	//.replace('/', '') - to avoid supabase create subfolders
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
	//https://bcxflhvvngrqocdbdafn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	//1. Create cabin
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select()

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be created')
	}

	//2. Upload image
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image)

	//3. Delete the cabin IF there was an error
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', newCabin.id)

		console.error(storageError)
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		)
	}

	return data
}
