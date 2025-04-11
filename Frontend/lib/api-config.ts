// Configuration for API endpoints and settings
export const API_CONFIG = {
  DEEPSEEK: {
    BASE_URL: "https://api.deepseek.com/v1",
    ENDPOINTS: {
      GENERATE_TEST: "/generate-test",
      EVALUATE: "/evaluate",
    },
    RATE_LIMIT: {
      REQUESTS_PER_MINUTE: 10,
    },
  },
}

// This is just for type definitions - the actual key will be stored in environment variables
export type ApiKeys = {
  DEEPSEEK_API_KEY: string
}
