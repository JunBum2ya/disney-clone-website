import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useDebounce, useQuery } from '../../hooks/CustomHooks';
import { MovieSearchData, MovieSearchInfo } from '../../format/interface';
import { useNavigate } from 'react-router-dom';
import '../../scss/SearchPage.scss';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<MovieSearchData[]>([]);
  let searchTerm = useDebounce(useQuery().get('q'), 500);
  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm ?? '').then((data) => {
        setSearchResult(data?.results ?? []);
      });
    }
  }, [searchTerm]);
  return (
    <>
      {searchResult.length > 0 ? (
        <SearchResultSection data={searchResult} />
      ) : (
        <EmptySearchResultSection param={searchTerm} />
      )}
    </>
  );
};

const SearchResultSection = (props: SearchResultSectionProps) => {
  const { data } = props;
  return (
    <section className="search-container">
      {data.map((movie, index) => (
        <MovieSearchImage key={index} data={movie} />
      ))}
    </section>
  );
};

const MovieSearchImage = (props: MovieSearchImageProps) => {
  const navigate = useNavigate();
  const { data } = props;
  return (
    <div className="movie">
      <div
        className="movie__column-poster"
        onClick={() => {
          navigate(`/${data.id}`);
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          alt="movie"
          className="movie__poster"
        />
      </div>
    </div>
  );
};

interface MovieSearchImageProps {
  data: MovieSearchData;
}

interface SearchResultSectionProps {
  data: MovieSearchData[];
}

const EmptySearchResultSection = (props: EmptySearchResultSectionProps) => {
  const { param } = props;
  return (
    <section className="no-results">
      <div className="no-results__text">
        <p>찾고자하는 검색어 "{param}"에 맞는 영화가 없습니다.</p>
      </div>
    </section>
  );
};

interface EmptySearchResultSectionProps {
  param: string | null;
}

const fetchSearchMovie = async (searchTerm: string) => {
  try {
    const response = await axios.get<MovieSearchInfo>(
      `/search/multi?include_adult=false&query=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default SearchPage;
