type EmptyProps = {
	resourceName: string
}

function Empty({ resourceName }: EmptyProps) {
	return <p>Невозможно найти {resourceName} </p>
}

export default Empty
