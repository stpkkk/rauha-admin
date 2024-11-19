import { UserAttributes } from '@supabase/supabase-js'
import supabase, { supabaseUrl } from './supabase'

type Credentials = {
	email: string
	password: string
	fullName?: string
}

export async function signup({ fullName, email, password }: Credentials) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	})

	if (error) throw new Error(error.message)

	return data
}

export async function login({ email, password }: Credentials) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	})

	if (error) throw new Error(error.message)

	return data
}

export async function logout() {
	const { error } = await supabase.auth.signOut()

	if (error) throw new Error(error.message)
}

export async function getCurrentUser() {
	//get user and session from Local Storage
	const { data: session } = await supabase.auth.getSession()

	if (!session.session) return null

	const { data, error } = await supabase.auth.getUser()

	if (error) throw new Error(error.message)

	return data?.user
}

export async function updateCurrentUser({
	password,
	fullName,
	avatar,
}: {
	password?: string
	fullName?: string
	avatar?: File | null
}) {
	// 1. Update password OR fullName
	let updateData: UserAttributes = {}

	if (password) updateData.password = password
	if (fullName) updateData.data = { ...updateData.data, fullName }

	if (Object.keys(updateData).length > 0) {
		const { data, error } = await supabase.auth.updateUser(updateData)
		if (error) throw new Error(error.message)
		if (!avatar) return data
	}

	// 2. Update the avatar image
	//Ensure that we created a bucket for avatars in supabase and config policies
	if (avatar) {
		const { data: userData } = await supabase.auth.getUser()
		if (!userData || !userData.user) throw new Error('Пользователь не найден')

		const fileName = `avatar-${userData.user.id}-${Math.random()}`

		const { error: storageError } = await supabase.storage
			.from('avatars')
			.upload(fileName, avatar)

		if (storageError) throw new Error(storageError.message)

		// 3. If point 2 success Update avatar in the user
		const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
			{
				data: {
					avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
				},
			}
		)

		if (error2) throw new Error(error2.message)

		return updatedUser
	}

	// If no updates were made
	return null
}
