import { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../api/axios';
import '../scss/Row.scss';
import { MovieData, MoviePageInfo } from '../format/interface';
import { Genre, genreRequest, requests } from '../api/requests';
import { useOnClickOutside } from '../hooks/CustomHooks';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Swiper 스타일 import

const baseUrl = 'https://image.tmdb.org/t/p/original';

const RowGroup = () => {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const categoryList: { title: string; code: string; url: string }[] = [
    { title: 'Trending Now', code: 'TN', url: requests.fetchTrending },
    { title: 'Top Rated', code: 'TR', url: requests.fetchTopRated },
    { title: 'Action Movie', code: 'AM', url: genreRequest(Genre.ACTION) },
    { title: 'Comedy Movie', code: 'CM', url: genreRequest(Genre.COMEDY) },
    { title: 'Horror Movie', code: 'HR', url: genreRequest(Genre.HORROR) },
  ];

  return (
    <>
      {categoryList.map((category, index) => (
        <Row
          key={index}
          title={category.title}
          code={category.code}
          url={category.url}
          setMovie={setMovie}
          setShow={setShow}
        />
      ))}
      <MovieModal movie={movie} isShow={show} setShow={setShow} />
    </>
  );
};

const Row = (props: RowProps) => {
  const { title, url } = props;
  const [movies, setMovies] = useState<MovieData[]>([]);

  const fetchMovieData = useCallback(
    async (url: string) => {
      const response = await axios.get<MoviePageInfo>(url);
      setMovies(response.data.results);
      return response;
    },
    [url]
  );

  const postersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMovieData(props.url);
  }, [fetchMovieData]);

  const handleClick = (param: MovieData) => {
    props.setMovie((movie) => param);
    props.setShow((show) => true);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="slider">
        <Swiper
          className="row__posters"
          loop={true}
          spaceBetween={10}
          modules={[Navigation]}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          navigation
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index} className="row__poster">
              <img
                src={`${baseUrl}/${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

interface RowProps {
  title: string;
  code: string;
  url: string;
  setMovie: React.Dispatch<React.SetStateAction<MovieData | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MovieModal = (props: MovieModalProps) => {
  const { movie, isShow, setShow } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setShow(false);
  });
  return (
    <div className={`presentation${isShow ? ' show' : ''}`} role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={modalRef}>
          <span
            onClick={() => {
              setShow((show) => false);
            }}
            className="modal-close"
          >
            X
          </span>
          <img
            className="modal__poster-img"
            src={`${baseUrl}/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>{' '}
              {movie?.relase_date}
            </p>
            <h2 className="modal__title">{movie?.title}</h2>
            <p className="modal__overview">평점: {movie?.vote_average}</p>
            <p className="modal__overview">{movie?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MovieModalProps {
  movie: MovieData | null;
  isShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default RowGroup;
