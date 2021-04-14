// const searchRequest,searchResponse = require("./../../models/youtube");

let { google } = require("googleapis");
const client = google.youtube({
  version: "v3",
  auth: configs.utube.apikey,
});

/**
 * @param searchRequest
 * @return searchResponse
 */
const utubeSearch = async (req: any, res: any) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let numResults = req.query.resultsSize || 3;
    const results = await client.search.list({
      part: "snippet",
      type: "video",
      maxResults: numResults,
      order: "relevance",
      q: req.query.query,
    });
    res.status(200).json(results.data.items);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export { utubeSearch };
