import { MockSearchData, SearchResult } from "../types/searchResultItem"

export const filterResultsWithLimit = (
	searchText: string,
	mockData: MockSearchData[],
	limit: number
): SearchResult[] => {
	if (!mockData) {
		return []
	}

	const filteredResults = mockData
		.filter((mockSearchItem) => {
			const title = mockSearchItem.title.toLowerCase()
			const content = mockSearchItem.content.toLowerCase()
			const searchTerm = searchText.toLowerCase()
			return title.includes(searchTerm) || content.includes(searchTerm)
		})
		.map((resultItem) => {
			const { id, title } = resultItem
			return { id, title } as SearchResult
		})
		.slice(0, limit)

	return filteredResults
}
