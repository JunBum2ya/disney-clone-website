import { useCallback, useEffect, useState } from 'react';
import axios from '../api/axios';

const Row = (props: RowProps) => {
  const { titile, url } = props;
  const [movies, setMovies] = useState<any[]>([]);

  const fetchMovieData = useCallback(
    async (url: string) => {
      const response = await axios.get(url);
      setMovies(response.data.results);
      return response;
    },
    [url]
  );

  useEffect(() => {
    fetchMovieData(props.url);
  }, [fetchMovieData]);

  return (
    <div className="row">
      <h2>{titile}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow">{'<'}</span>
        </div>
        <div className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow">{'>'}</span>
        </div>
      </div>
    </div>
  );
};

interface RowProps {
  titile: string;
  code: string;
  url: string;
}

export default Row;
