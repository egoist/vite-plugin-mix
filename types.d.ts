declare module '$handler_file'
declare interface ImportMeta {
  env: {
    SSR: boolean
    MODE: string
    PROD: boolean
    DEV: boolean
    MIX_CLIENT_DIR: string
    MIX_HTML: string
  }
}
