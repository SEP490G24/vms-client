export {}

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      VITE_API_SERVER_URL: string;
      VITE_STORAGE_URL:string;
      VITE_BASE_PATH:string;
    };
  }
}
