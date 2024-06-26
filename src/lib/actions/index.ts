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

    console.log(product)

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

    revalidatePath(`/products/${newProduct.id}`)
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany()

    return products
  } catch (error) {
    console.log(error)
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) return null

    return product
  } catch (error) {
    console.log(error)
  }
}

// Likes
export async function getLikesByProductId(productId?: string, userId?: string) {
  try {
    let likes

    if (userId) {
      likes = await prisma.like.findMany({
        where: {
          userId,
        },
      })
    } else if (productId) {
      likes = await prisma.like.findMany({
        where: {
          productId,
        },
      })
    }

    return likes
  } catch (error) {
    console.error(error)
  }
}

// reviews
export async function getReviewsByProductId(
  productId?: string,
  userId?: string,
) {
  try {
    let reviews

    if (userId && productId) {
      reviews = await prisma.review.findMany({
        where: {
          AND: [{ productId }, { userId }],
        },
      })
    } else if (productId) {
      reviews = await prisma.review.findMany({
        where: {
          productId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })
    }
    return reviews
  } catch (e) {
    console.error(e)
  }
}
