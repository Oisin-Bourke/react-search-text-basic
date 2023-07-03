import { SearchResult } from "../../types/searchResultItem"

const SearchResultItem = ({ item }: { item: SearchResult }) => {
	return <div className="px-4 py-2">{item.title}</div>
}

export default SearchResultItem
