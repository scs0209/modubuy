'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../db'

import { scrapeAmazonProduct } from '../scraper'
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils'

export async function scrapeAndStoreProduct(productUrl: string) {
  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl)

    if (!scrapedProduct) return

    let product = scrapedProduct

    const existingProduct = await prisma.product.findUnique({
      where: {
        url: scrapedProduct.url,
      },
    })

    if (existingProduct) {
      await prisma.priceHistoryItem.create({
        data: {
          productId: existingProduct.id,
          price: scrapedProduct.currentPrice,
        },
      })

      const existingPriceHistory = await prisma.priceHistoryItem.findMany({
        where: {
          productId: existingProduct.id,
        },
      })

      console.log(existingPriceHistory)

      product = {
        ...scrapedProduct,
        lowestPrice: getLowestPrice(existingPriceHistory),
        highestPrice: getHighestPrice(existingPriceHistory),
        averagePrice: getAveragePrice(existingPriceHistory),
      }
    }

    const newProduct = await prisma.product.upsert({
      where: { url: scrapedProduct.url },
      create: product,
      update: product,
    })
    console.log('scrapedProduct:', scrapedProduct)
    revalidatePath(`/products/${newProduct.id}`)
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}
