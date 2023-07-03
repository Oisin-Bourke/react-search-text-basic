import { useState } from "react"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import SearchInput from "./SearchInput"
import SearchResults from "./SearchResults"
import { fetchSearchByTerm } from "../../api/search"
import { SearchResultsResponse } from "../../types/searchResultItem"

const SearchBox = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

	const { isFetching, isError, data } = useQuery<SearchResultsResponse>(
		["searchText", debouncedSearchTerm],
		() => fetchSearchByTerm(debouncedSearchTerm),
		{
			enabled: debouncedSearchTerm.length > 2,
			retry: 0,
		}
	)

	return (
		<div>
			{isError ? (
				<div
					className='block text-sm font-medium text-red-600'
					data-testid='search-box-error-label'
				>
					Whoops! Error fetching data.
				</div>
			) : null}
			<SearchInput
				searchTerm={searchTerm}
				onSetSearchTerm={setSearchTerm}
			/>
			{isFetching ? (
				<div className='block mb-2 text-sm font-medium text-gray-700'>
					{" "}
					Loading...{" "}
				</div>
			) : (
				<SearchResults searchResults={data?.results} />
			)}
		</div>
	)
}

export default SearchBox
