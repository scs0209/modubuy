'use server'

import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from '../utils'

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export async function scrapeAmazonProduct(url: string) {
  if (!url) return

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)
  const port = 22225
  const session_id = (1000000 * Math.random()) | 0

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    // Fetch the product page
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data)

    // Extract the product title
    const title = $('#productTitle').text().trim()
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    )

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price'),
    )

    const outOfStock =
      $('#availability span').text().trim().toLowerCase() ===
      'currently unavailable'

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'

    const imageUrls = Object.keys(JSON.parse(images))

    const imageList: string[] = []
    $('img').each((i, element) => {
      const imgUrl = $(element).attr('src')
      if (imgUrl && isValidUrl(imgUrl)) {
        imageList.push(imgUrl)
      }
    })

    if (
      imageUrls[0] &&
      !imageList.includes(imageUrls[0]) &&
      isValidUrl(imageUrls[0])
    ) {
      imageList.unshift(imageUrls[0])
    }

    const currency = extractCurrency($('.a-price-symbol'))
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '')

    const description = extractDescription($)

    const category = $('#detailBullets_feature_div .a-list-item')
      .filter((i, el) =>
        $(el)
          .find('.a-text-bold')
          .text()
          .trim()
          .toLowerCase()
          .includes('department'),
      )
      .find('span:not(.a-text-bold)')
      .text()
      .trim()

    const data = {
      url,
      currency: currency || '$',
      image: imageList.slice(0, 8),
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      discountRate: Number(discountRate),
      category: category,
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }

    return data
  } catch (error: any) {
    console.log(error)
  }
}
