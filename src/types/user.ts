type UserMetadata = {
	email?: string
	fullName?: string
	avatar?: string
}

export type User = {
	id?: string
	role?: string
	email?: string

	user_metadata: UserMetadata
} | null
