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
