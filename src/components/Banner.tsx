import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { requests } from '../api/requests';
import '../scss/Banner.scss';

const Banner = () => {
  const [movie, setMovie] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.fetchNowPlaying);
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetail);
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.original_title}</h1>
        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button className="banner__button play">Play</button>
          )}
        </div>
        <p className="banner__description">{truncate(movie.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

const truncate = (
  param: string | null | undefined,
  endIndex: number
): string => {
  const str = param ?? '';
  console.log(str);
  return str.length > endIndex ? `${str.substring(0, endIndex)}...` : str;
};

export default Banner;
