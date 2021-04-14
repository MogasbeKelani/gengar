export interface problem {
  title: String;
  questionTitleSlug: String;
  difficulty: Number;
}

export interface problemList {
  problems: [problem];
}

export interface singleProblemRequest {
  questionTitleSlug: String;
}
export interface singleProblemResponse {
  title: String;
  questionTitleSlug: String;
  content: String;
  difficulty: Number;
  likes: Number;
  dislikes: Number;
  stats: {};
  topicTags: [String];
  languages: [String];
}
