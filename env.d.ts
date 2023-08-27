/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  //al poner readonly, es para advertirnos y prevenir cualquier sobreescritura
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
