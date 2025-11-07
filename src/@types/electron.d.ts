export {};

declare global {
  interface Window {
    electronAPI: {
      setLanguage: (lang: string) => void;
      getLanguages: () => Promise<{ code: string; file: string }[]>;
    };
  }
}
