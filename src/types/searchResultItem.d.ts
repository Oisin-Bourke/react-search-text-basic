export interface SearchResult {
	id: number
	title: string
}

export interface SearchResultsResponse {
	results: SearchResult[]
}

export interface MockSearchData extends SearchResult {
	content: string
}
