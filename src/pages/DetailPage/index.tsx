import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetail } from '../../format/interface';

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    fetchData(Number(movieId)).then((data) => {
      setMovie(data);
    });
  }, [movieId]);
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt="movie"
      />
    </section>
  );
};

const fetchData = async (movieId: number) => {
  const response = await axios.get<MovieDetail>(`/movie/${movieId}`);
  return response.data;
};

export default DetailPage;
