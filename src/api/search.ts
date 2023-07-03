export const fetchSearchByTerm = async (searchTerm: string) => {
	const response = await fetch(`/api/search?searchText=${searchTerm}`)

	if (!response.ok) {
		throw new Error("An error occurred while fetching data.")
	}

	return response.json()
}
