import { render, screen, act, waitFor } from "@testing-library/react"
import SearchBox from "./SearchBox"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import userEvent from "@testing-library/user-event"
import { handlers } from "./../../mocks/handlers"
import { setupServer } from "msw/node"
import { rest } from "msw"

const server = setupServer(...handlers)

const queryClient = new QueryClient()

beforeAll(() => {
	server.listen()
})

afterEach(() => {
	server.resetHandlers()
	queryClient.clear()
})

afterAll(() => {
	server.close()
})

const SearchBoxWrapped = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<SearchBox />
		</QueryClientProvider>
	)
}

test("renders the search input box", () => {
	render(<SearchBoxWrapped />)

	const searchInput = screen.getByTestId("search-box-input")

	expect(searchInput).toBeInTheDocument()
})

test("search input text of single char expect no results label", () => {
	render(<SearchBoxWrapped />)
	const searchInput = screen.getByTestId("search-box-input")

	act(() => {
		userEvent.type(searchInput, "p")
	})

	const noResultsLabel = screen.getByTestId("search-box-no-results")
	expect(noResultsLabel).toBeInTheDocument()
})

test("search input text red returns two results after 1.2 second timeout", async () => {
	render(<SearchBoxWrapped />)
	const searchInput = screen.getByTestId(
		"search-box-input"
	) as HTMLInputElement

	act(() => {
		userEvent.type(searchInput, "red")
	})

	await waitFor(
		() => {
			expect(searchInput.value).toBe("red")
			const watermellonText = screen.getByText("Watermelon")
			const strawberryText = screen.getByText("Strawberry")
			expect(watermellonText).toBeInTheDocument()
			expect(strawberryText).toBeInTheDocument()
		},
		{
			timeout: 1200,
		}
	)
})

test("search input text red expect loading... label when no timeout", async () => {
	render(<SearchBoxWrapped />)
	const searchInput = screen.getByTestId(
		"search-box-input"
	) as HTMLInputElement

	act(() => {
		userEvent.type(searchInput, "red")
	})

	await waitFor(() => {
		expect(searchInput.value).toBe("red")
		const loadingLabel = screen.getByText("Loading...")
		expect(loadingLabel).toBeInTheDocument()
	})
})

test("search input text red server error response displays error message", async () => {
	const errorResponse = rest.get("api/search", (req, res, ctx) => {
		return res(
			ctx.status(500),
			ctx.json({ message: "Internal server error" })
		)
	})
	server.use(errorResponse)
	render(<SearchBoxWrapped />)
	const searchInput = screen.getByTestId(
		"search-box-input"
	) as HTMLInputElement

	act(() => {
		userEvent.type(searchInput, "red")
	})

	await waitFor(() => {
		expect(searchInput.value).toBe("red")
		const errorLabel = screen.getByTestId("search-box-error-label")
		expect(errorLabel).toBeInTheDocument()
	})
})
