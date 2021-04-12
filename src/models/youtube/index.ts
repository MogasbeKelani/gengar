export interface searchRequest {
  resultsSize: number;
  query: String;
}
export interface youtubeSearchResponse {
  items: [searchResults];
}
export interface searchResults {
  title: String;
  description: String;
}
