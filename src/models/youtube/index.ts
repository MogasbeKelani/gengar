export interface searchRequest {
  resultsSize: number;
  query: String;
}
export interface searchResponse {
  items: [searchResults];
}
export interface searchResults {
  title: String;
  description: String;
}
