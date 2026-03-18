const env = import.meta.env;

const appDefaults: AppSettings = {
  apiBaseUrl: env.VITE_API_BASE_URL
}

export default appDefaults