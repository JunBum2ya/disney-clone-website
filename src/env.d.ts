declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_MOVIE_API_KEY: string;
      REACT_APP_FIREBASE_API_KEY: string;
      REACT_APP_AUTH_DOMAIN: string;
      REACT_APP_PROJECT_ID: string;
      REACT_APP_STORAGE_BUCKET: string;
      REACT_APP_MESSAGING_SENDER_ID: string;
      REACT_APP_APPLY_ID: string;
    }
  }
}

export {};
