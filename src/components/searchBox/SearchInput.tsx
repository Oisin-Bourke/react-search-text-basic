type SearchInputProps = {
	searchTerm: string
	onSetSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput = ({ searchTerm, onSetSearchTerm }: SearchInputProps) => {
	return (
		<form>
			<label className="block mb-2 text-sm font-medium text-gray-700">
				Search:{" "}
				<input
					type='text'
					placeholder="Think fruit..."
					max="20"
					value={searchTerm}
					onChange={(event) => onSetSearchTerm(event.target.value)}
                    className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    data-testid='search-box-input'
				/>
			</label>
		</form>
	)
}

export default SearchInput
