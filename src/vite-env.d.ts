// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_RPC_URL: string
    // Add other env variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }