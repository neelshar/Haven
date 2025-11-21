import { openai } from './client'

interface ScoreResult {
  score: number
  reasoning: string
}

export async function scoreProduct(
  product: any,
  requirements: any[]
): Promise<ScoreResult> {
  // TODO: Build scoring prompt
  // TODO: Call OpenAI GPT-4
  // TODO: Parse JSON response
  // TODO: Validate score (0-100)
  // TODO: Handle errors

  return {
    score: 0,
    reasoning: '',
  }
}

