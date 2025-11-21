/**
 * Example Product Scraper
 * 
 * This is a template for scraping product data.
 * Modify based on your target website structure.
 */

import axios from 'axios'
import * as cheerio from 'cheerio'
import { createClient } from '@supabase/supabase-js'
import { openai } from '@/lib/openai/client'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface ScrapedProduct {
  name: string
  description: string
  category: string
  rating?: number
  review_count?: number
  website_url: string
  source: string
}

/**
 * Example: Scrape from a simple HTML page
 */
async function scrapeProductPage(url: string): Promise<ScrapedProduct | null> {
  try {
    // 1. Fetch the page
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FadePyraBot/1.0)',
      },
    })

    // 2. Parse HTML
    const $ = cheerio.load(response.data)

    // 3. Extract data (modify selectors based on target site)
    const product: ScrapedProduct = {
      name: $('#product-title').text().trim(),
      description: $('#product-description').text().trim(),
      category: $('.product-category').text().trim() || 'General',
      rating: parseFloat($('.rating-value').text()) || undefined,
      review_count: parseInt($('.review-count').text().replace(/\D/g, '')) || undefined,
      website_url: url,
      source: new URL(url).hostname,
    }

    // 4. Validate required fields
    if (!product.name || !product.description) {
      console.error('Missing required fields:', { name: product.name, hasDesc: !!product.description })
      return null
    }

    return product
  } catch (error) {
    console.error('Error scraping product:', error)
    return null
  }
}

/**
 * Generate embedding for product using OpenAI
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}

/**
 * Save product to database with embedding
 */
async function saveProduct(product: ScrapedProduct) {
  try {
    // 1. Generate embedding from name + description
    const embeddingText = `${product.name}. ${product.description}`
    const embedding = await generateEmbedding(embeddingText)

    // 2. Insert into database
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        category: product.category,
        rating: product.rating,
        review_count: product.review_count,
        website_url: product.website_url,
        embedding: embedding,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    console.log('✅ Saved product:', product.name)
    return data
  } catch (error) {
    console.error('Error saving product:', error)
    throw error
  }
}

/**
 * Scrape multiple products with rate limiting
 */
async function scrapeProducts(urls: string[]) {
  console.log(`Starting scrape of ${urls.length} products...`)
  
  let successCount = 0
  let errorCount = 0

  for (const url of urls) {
    try {
      // 1. Scrape product data
      const product = await scrapeProductPage(url)
      
      if (!product) {
        errorCount++
        continue
      }

      // 2. Save to database with embedding
      await saveProduct(product)
      successCount++

      // 3. Rate limit: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000))

    } catch (error) {
      console.error(`Failed to process ${url}:`, error)
      errorCount++
    }
  }

  console.log('\n=== Scraping Complete ===')
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

/**
 * Example: Scrape from Product Hunt API
 */
async function scrapeProductHunt() {
  try {
    // Product Hunt API (requires token)
    const response = await axios.post('https://api.producthunt.com/v2/api/graphql', {
      query: `
        query {
          posts(first: 20, order: VOTES) {
            edges {
              node {
                id
                name
                tagline
                description
                votesCount
                website
                topics {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.PRODUCT_HUNT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    const posts = response.data.data.posts.edges

    for (const { node } of posts) {
      const product: ScrapedProduct = {
        name: node.name,
        description: node.description || node.tagline,
        category: node.topics.edges[0]?.node.name || 'Tech',
        review_count: node.votesCount,
        website_url: node.website,
        source: 'producthunt',
      }

      await saveProduct(product)
      
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log('✅ Product Hunt scraping complete')
  } catch (error) {
    console.error('Product Hunt scraping failed:', error)
  }
}

/**
 * Import products from CSV file
 */
async function importFromCSV(filePath: string) {
  // TODO: Implement CSV parsing
  // Use: npm install csv-parser
  // Read file, parse rows, save to database
  console.log('CSV import not yet implemented')
}

// Example usage
async function main() {
  // Option 1: Scrape specific URLs
  const urls = [
    'https://example.com/product1',
    'https://example.com/product2',
  ]
  // await scrapeProducts(urls)

  // Option 2: Use API
  // await scrapeProductHunt()

  // Option 3: Import from CSV
  // await importFromCSV('./products.csv')

  console.log('Scraping script template ready!')
  console.log('Modify the selectors and URLs based on your target sites.')
}

// Run if called directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

export { scrapeProductPage, scrapeProducts, scrapeProductHunt, generateEmbedding, saveProduct }

