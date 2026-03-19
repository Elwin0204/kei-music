const env = import.meta.env;

const appDefaults: AppSettings = {
  apiBaseUrl: env.VITE_API_BASE_URL,
  buildDir: env.VITE_APP_BUILD_DIR || '/',
}

export default appDefaults