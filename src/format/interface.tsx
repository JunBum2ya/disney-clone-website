export interface MovieDetail {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: { id: number; name: string }[];
  hompage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  popularity: number;
  overview: string;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_coutries: {
    iso_3166_1: string;
    name: string;
  }[];
  relese_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  video: boolean;
  videos: {
    results: {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      official: boolean;
      publish_at: string;
      site: string;
      size: number;
      type: string;
    }[];
  };
  title?: string;
  vote_average: number;
  vote_count: number;
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

export interface MovieSearchInfo {
  page: number;
  results: MovieSearchData[];
  total_pages: number;
  total_results: number;
}

export interface MovieSearchData {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
