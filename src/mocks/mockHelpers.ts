import { SearchResultMock } from "../types/searchResultItem"

export const filterResultsWithLimit = (
	searchText: string,
	mockData: SearchResultMock[],
	limit: number
): SearchResultMock[] => {
	if (!mockData) {
		return []
	}

	const filteredResults = mockData.filter((item) => {
		const title = item.title.toLowerCase()
		const content = item.content.toLowerCase()
		const searchTerm = searchText.toLowerCase()
		return title.includes(searchTerm) || content.includes(searchTerm)
	})

	return filteredResults.slice(0, limit)
}
