import { searchRequest, searchResponse } from "./../../models/youtube";
const { google } = require("googleapis");
const client = google.youtube({
  version: "v3",
  auth: configs.utube.apikey,
});

/**
 * @param searchRequest
 * @return searchResponse
 */
export async function search(options: searchRequest): Promise<searchResponse> {
  try {
    const numResults = options.resultsSize || 3;
    const results = await client.search.list({
      part: "snippet",
      type: "video",
      maxResults: numResults,
      order: "relevance",
      q: options.query,
    });
    return results.data.items;
  } catch (err) {
    throw err;
  }
}
