
export interface MovieDto {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface ApiResultDto {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}