/* eslint-disable */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { scrapeAndStoreProduct } from '@/lib/actions'
import { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const { hostname } = parsedURL

    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}

const SearchForm = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt)

    if (!isValidLink) return alert('Please provide a valid Amazon link')

    try {
      setIsLoading(true)

      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex flex-wrap gap-4 mt-12 w-full justify-center"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="w-[500px]"
      />

      <Button type="submit" disabled={searchPrompt === ''}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  )
}

export default SearchForm
