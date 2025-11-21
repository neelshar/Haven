import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// TODO: Add helper functions for:
// - Generating embeddings
// - Scoring products
// - Comparing products
// - Retry logic with exponential backoff

