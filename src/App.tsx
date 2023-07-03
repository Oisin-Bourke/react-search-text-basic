import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import SearchBox from "./components/searchBox/SearchBox"

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='flex justify-center items-center h-screen'>
				<main className='bg-white rounded-lg shadow-md p-6 w-80 h-80'>
					<SearchBox />
				</main>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}

export default App
