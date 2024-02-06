export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: genre[];
  hompage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  popularity: number;
}

interface genre {
  id: number;
  name: string;
}

export interface MoviePageInfo {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  relase_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
