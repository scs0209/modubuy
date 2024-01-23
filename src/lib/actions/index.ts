'use server'

import { scrapeAmazonProduct } from '../scrpaer'

export async function scrapeAndStoreProduct(productUrl: string) {
  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl)
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}
