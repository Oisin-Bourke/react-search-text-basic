export interface SearchResult {
	id: number
	title: string
}

export interface SearchResultsResponse {
	results: SearchResult[]
}

export interface SearchResultMock extends SearchResult {
	content: string
}
