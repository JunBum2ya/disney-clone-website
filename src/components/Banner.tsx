import axios from '../api/axios';
import YouTube from 'react-youtube';
import { ReactNode, useEffect, useState } from 'react';
import { requests } from '../api/requests';
import '../scss/Banner.scss';
import { MovieDetail, MoviePageInfo } from '../format/interface';

const Banner = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const changeBanner = () => {
    setIsClicked((clicked) => !clicked);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get<MoviePageInfo>(requests.fetchNowPlaying);
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    const { data: movieDetail } = await axios.get<MovieDetail>(
      `movie/${movieId}`,
      {
        params: { append_to_response: 'videos' },
      }
    );
    setMovie(movieDetail);
  };

  return isClicked ? (
    <VideoBanner movie={movie} changeBannerFunction={changeBanner} />
  ) : (
    <ImageBanner movie={movie} changeBannerFunction={changeBanner} />
  );
};

const VideoBanner = (props: BannerProps) => {
  const { movie, changeBannerFunction } = props;
  return (
    <div className="banner__container">
      <div className="home-container">
        <YoutubeIFrame
          videoId={movie?.videos.results[0].key ?? ''}
          classList={['youtube-banner']}
        />
        <button onClick={changeBannerFunction}>X</button>
      </div>
    </div>
  );
};

const ImageBanner = (props: BannerProps) => {
  const { movie, changeBannerFunction } = props;
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.original_title}
        </h1>
        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button
              className="banner__button play"
              onClick={changeBannerFunction}
            >
              Play
            </button>
          )}
        </div>
        <p className="banner__description">{truncate(movie?.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

interface BannerProps {
  movie: MovieDetail | null;
  changeBannerFunction: () => void;
}

const YoutubeIFrame = (props: YoutubeIFrameProps) => {
  const handleReady = (event: any) => {
    event.target.playVideo();
  };

  return (
    <YouTube
      className={props.classList?.join(' ') ?? ''}
      videoId={props.videoId}
      onReady={handleReady}
      opts={{
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1, // true 대신에 1을 사용
          loop: 1, // true 대신에 1을 사용
          rel: 0, // false 대신에 0을 사용
          modestbranding: 1, // true 대신에 1을 사용
          playlist: props.videoId,
        },
      }}
    ></YouTube>
  );
};

interface YoutubeIFrameProps {
  videoId: string;
  classList?: string[];
}

const truncate = (
  param: string | null | undefined,
  endIndex: number
): string => {
  const str = param ?? '';
  return str.length > endIndex ? `${str.substring(0, endIndex)}...` : str;
};

export default Banner;
