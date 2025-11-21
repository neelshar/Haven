import { openai } from './client'

export async function generateEmbedding(text: string): Promise<number[]> {
  // TODO: Call OpenAI embeddings API
  // TODO: Use text-embedding-3-small model
  // TODO: Handle errors
  // TODO: Add retry logic

  return []
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  // TODO: Batch generate embeddings
  // TODO: Add rate limiting (20ms delay)
  // TODO: Handle errors
  // TODO: Return array of embeddings

  return []
}

