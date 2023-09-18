export {}

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      API_SERVER_URL: string;
      VITE_BASE_PATH:string;
    };
  }
}
