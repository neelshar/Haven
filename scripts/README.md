# Scripts Directory

This directory contains utility scripts for data scraping, importing, and maintenance.

## Setup

```bash
# Install additional dependencies
npm install axios cheerio csv-parser

# For browser-based scraping (if needed)
npm install puppeteer
```

## Scripts

### `scrape-example.ts`
Template for scraping product data from websites.

**Usage:**
```bash
# Run with ts-node
npx ts-node scripts/scrape-example.ts

# Or compile and run
npx tsc scripts/scrape-example.ts
node scripts/scrape-example.js
```

**Modify for your needs:**
1. Update CSS selectors in `scrapeProductPage()`
2. Add your target URLs
3. Adjust rate limiting as needed

### Example: Scraping Amazon Products

```typescript
async function scrapeAmazon(productId: string) {
  const url = `https://www.amazon.com/dp/${productId}`
  
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0...',
    }
  })
  
  const $ = cheerio.load(response.data)
  
  return {
    name: $('#productTitle').text().trim(),
    description: $('#feature-bullets').text().trim(),
    rating: parseFloat($('.a-icon-star .a-icon-alt').text()),
    review_count: parseInt($('#acrCustomerReviewText').text().replace(/\D/g, '')),
    price: parseFloat($('.a-price-whole').first().text().replace(/[^0-9.]/g, '')),
  }
}
```

### Example: Product Hunt API

```typescript
// Get token from: https://www.producthunt.com/v2/oauth/applications
const PRODUCT_HUNT_TOKEN = process.env.PRODUCT_HUNT_TOKEN

async function getTopProducts() {
  const response = await axios.post(
    'https://api.producthunt.com/v2/api/graphql',
    {
      query: `
        query {
          posts(first: 50, order: VOTES) {
            edges {
              node {
                name
                tagline
                description
                votesCount
              }
            }
          }
        }
      `
    },
    {
      headers: {
        'Authorization': `Bearer ${PRODUCT_HUNT_TOKEN}`
      }
    }
  )
  
  return response.data.data.posts.edges
}
```

## Best Practices

### 1. Rate Limiting
Always add delays between requests:
```typescript
// 1 second delay
await new Promise(resolve => setTimeout(resolve, 1000))
```

### 2. Error Handling
Wrap scraping in try-catch:
```typescript
try {
  const product = await scrapeProduct(url)
} catch (error) {
  console.error('Scraping failed:', error)
  // Continue with next product
}
```

### 3. Data Validation
Check required fields:
```typescript
if (!product.name || !product.description) {
  console.warn('Skipping invalid product')
  return null
}
```

### 4. Respect robots.txt
Check if scraping is allowed:
```bash
curl https://example.com/robots.txt
```

### 5. Use Proxies (if needed)
For large-scale scraping:
```typescript
const response = await axios.get(url, {
  proxy: {
    host: 'proxy.example.com',
    port: 8080
  }
})
```

## Data Sources

### Free APIs
- ✅ **Product Hunt**: Tech products, requires token
- ✅ **Best Buy**: Electronics, free API
- ✅ **GitHub**: Open-source tools, free API
- ✅ **Hacker News**: Tech products (unofficial API)

### Paid APIs
- 💰 **RapidAPI**: Many product APIs ($10-50/mo)
- 💰 **Amazon Product API**: Requires affiliate account
- 💰 **Bright Data**: Professional scraping ($50+/mo)

### Scraping Targets
- ⚠️ **Amazon**: Check ToS, use official API if possible
- ✅ **Product Hunt**: API available
- ✅ **G2/Capterra**: Public data
- ⚠️ **Walmart**: Check ToS

## Troubleshooting

### Issue: "403 Forbidden"
**Solution**: Add proper User-Agent header
```typescript
headers: {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
```

### Issue: "Rate limited"
**Solution**: Increase delay between requests
```typescript
await new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
```

### Issue: "JavaScript not loading"
**Solution**: Use Puppeteer instead of Cheerio
```typescript
import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto(url)
const html = await page.content()
```

### Issue: "Database error"
**Solution**: Check your Supabase connection and RLS policies

## Example Workflow

1. **Start small**: Scrape 10 products manually
2. **Test embeddings**: Verify OpenAI integration works
3. **Scale up**: Automate for 100 products
4. **Add sources**: Implement multiple scrapers
5. **Schedule**: Run daily/weekly with cron or GitHub Actions

## Monitoring

Track scraping metrics:
- Products scraped per day
- Error rate
- OpenAI API costs
- Database storage usage

## Legal Notice

⚠️ **Important**: 
- Only scrape publicly available data
- Respect robots.txt and rate limits
- Check website Terms of Service
- Consider using official APIs when available
- Add proper attribution when required

For questions about legal compliance, consult with legal team before scraping.

