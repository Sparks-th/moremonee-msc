/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_MOREMONEE_APP_URL?: string;
  readonly VITE_FORGOT_PASSWORD_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
