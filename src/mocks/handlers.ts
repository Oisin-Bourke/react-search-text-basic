import { rest } from "msw"
import { mockSearchData } from "./mockData"
import { filterResultsWithLimit } from "./mockHelpers"

export const handlers = [
	rest.get("api/search", (req, res, ctx) => {
		const searchText = req.url.searchParams.get("searchText")

		if (!searchText) {
			return res(
				ctx.status(200),
				ctx.delay(500),
				ctx.json({
					results: [],
				})
			)
		}

		const filteredResults = filterResultsWithLimit(
			searchText,
			mockSearchData,
			5
		)

		return res(
			ctx.status(200),
			ctx.delay(500),
			ctx.json({
				results: filteredResults,
			})
		)
	}),
]
