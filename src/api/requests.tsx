export const requests = {
  fetchNowPlaying: 'movie/now_playing',
  fetchTrending: '/trending/all/week',
  fetchTopRated: '/movie/top_rated',
};

export const genreRequest = (genre: Genre) => {
  return `/discover/movie?with_genres=${genre}`;
};

export enum Genre {
  ACTION = 28,
  COMEDY = 35,
  HORROR = 27,
  ROMANCE = 10749,
  DOCUMENTARY = 99,
}
