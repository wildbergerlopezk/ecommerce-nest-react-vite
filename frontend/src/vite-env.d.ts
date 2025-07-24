/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // otras variables que uses en .env
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
