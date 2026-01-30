/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMAGES_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.styl?inline' {
  import { CSSResult } from 'lit';
  const styles: CSSResult;
  export default styles;
}
