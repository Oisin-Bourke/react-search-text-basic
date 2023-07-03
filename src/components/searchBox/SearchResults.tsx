import SearchResultItem from "./SearchResultItem"
import { SearchResult } from "../../types/searchResultItem"

type SearchResultsProps = {
	searchResults: SearchResult[] | undefined
}

const SearchResults = ({ searchResults }: SearchResultsProps) => {
	if (searchResults && searchResults.length > 0) {
		return (
			<ul className='border border-gray-300 rounded-md'>
				{searchResults.map((item) => (
					<SearchResultItem key={item.id} item={item} />
				))}
			</ul>
		)
	} else {
		return (
			<div
				className='block mb-2 text-sm font-medium text-gray-700'
				data-testid='search-box-no-results'
			>
				No results. Start typing to search.
			</div>
		)
	}
}

export default SearchResults
