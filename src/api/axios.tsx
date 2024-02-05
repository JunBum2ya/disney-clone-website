import axios from 'axios';

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
const language = 'ko-KR';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: language,
  },
});

export default instance;
