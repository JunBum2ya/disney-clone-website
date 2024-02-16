declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_MOVIE_API_KEY: string;
    }
  }
}

export {};
