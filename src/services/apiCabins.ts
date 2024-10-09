import supabase, { supabaseUrl } from './supabase'
import { CabinType } from '../types/cabin'

//order('created_at', { ascending: true }) - This approach guarantees that when a cabin is edited, it maintains its relative position in the table based on its original creation time, rather than being automatically shifted to the last position

export async function getCabins() {
	const { data, error } = await supabase
		.from('cabins')
		.select('*')
		.order('created_at', { ascending: true })

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be loaded')
	}

	return data
}

export const createCabin = async (newCabin: CabinType) => {
	if (!(newCabin.image instanceof File || typeof newCabin.image === 'string')) {
		return
	}

	let cabinImage
	let imageName: string = ''

	if (newCabin.image instanceof File) {
		imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
		cabinImage = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
	} else {
		delete newCabin.id
		cabinImage = newCabin.image
	}

	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: cabinImage }])
		.select()

	if (error) {
		throw new Error('Cabin could not be created')
	}

	if (newCabin.image instanceof File) {
		const { error: storageError } = await supabase.storage
			.from('cabin-images')
			.upload(imageName, newCabin.image)

		if (storageError) {
			await supabase.from('cabins').delete().eq('id', data[0].id)
			throw new Error('Cabin image upload fail')
		}
	}

	return data
}

export const updateCabin = async (cabin: CabinType) => {
	if (!cabin.id) {
		throw new Error('Cabin ID is required for update')
	}

	let dataToUpdate: Partial<CabinType> = { ...cabin }
	delete dataToUpdate.id

	// Get the current cabin data to check if the image has changed
	const { data: currentCabin, error: fetchError } = await supabase
		.from('cabins')
		.select('image')
		.eq('id', cabin.id)
		.single()

	if (fetchError) {
		throw new Error('Failed to fetch current cabin data')
	}

	// Handle image update
	if (cabin.image instanceof FileList && cabin.image.length > 0) {
		const file = cabin.image[0]
		const imageName = `${Math.random()}-${file.name}`.replace('/', '')
		const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

		// Upload the new image
		const { error: storageError } = await supabase.storage
			.from('cabin-images')
			.upload(imageName, file)

		if (storageError) {
			throw new Error('Cabin image upload failed')
		}

		// Update the image path in the data to be updated
		dataToUpdate.image = imagePath

		// Delete the old image if it exists and is different from the new one
		if (currentCabin.image && currentCabin.image !== imagePath) {
			const oldImageName = currentCabin.image.split('/').pop()
			await supabase.storage.from('cabin-images').remove([oldImageName])
		}
	} else if (typeof cabin.image === 'string') {
		// If it's a string (URL), keep it as is
		dataToUpdate.image = cabin.image
	} else {
		// If it's neither a FileList nor a string, remove it from the update
		delete dataToUpdate.image
	}

	// Update the cabin data
	const { data, error } = await supabase
		.from('cabins')
		.update(dataToUpdate)
		.eq('id', cabin.id)
		.select()

	if (error) {
		throw new Error('Cabin could not be updated')
	}

	return data
}

export async function deleteCabin(id?: number | string) {
	// First, get the cabin data to retrieve the image URL
	const { data: cabin, error: fetchError } = await supabase
		.from('cabins')
		.select('image')
		.eq('id', id)
		.single()

	if (fetchError) {
		console.error(fetchError)
		throw new Error('Failed to fetch cabin data for deletion')
	}

	// Delete the cabin from the database
	const { error: deleteError } = await supabase
		.from('cabins')
		.delete()
		.eq('id', id)

	if (deleteError) {
		console.error(deleteError)
		throw new Error('Cabin could not be deleted')
	}

	// If the cabin had an image, delete it from storage
	if (cabin && cabin.image) {
		const imageName = cabin.image.split('/').pop()
		const { error: storageError } = await supabase.storage
			.from('cabin-images')
			.remove([imageName])

		if (storageError) {
			console.error(storageError)
			// Note: We don't throw here because the cabin was already deleted from the database
			console.warn('Cabin image could not be deleted from storage')
		}
	}
}
