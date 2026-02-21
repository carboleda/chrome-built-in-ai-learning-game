/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_GOOGLE_TAG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
