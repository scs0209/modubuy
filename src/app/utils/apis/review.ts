import { backUrl } from '@/app/config/url'

export const fetchReview = async (productId: string, userId: string) => {
  const response = await fetch(
    `${backUrl}/api/products/reviews?productId=${productId}&userId=${userId}`,
  )
  const data = await response.json()

  if (response.ok) {
    return data
  }
  throw new Error(data.error)
}

export const createReview = async (
  content: string,
  rating: number,
  userId: string,
  productId: string,
): Promise<any> => {
  const response = await fetch(`${backUrl}/api/products/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, rating, userId, productId }),
  })

  const data = await response.json()

  if (response.ok) {
    return data
  }
  throw new Error(data.error)
}

export const updateReview = async (
  id: string,
  content: string,
  rating: number,
): Promise<any> => {
  const response = await fetch(`${backUrl}/api/products/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, rating }),
  })

  const data = await response.json()

  if (response.ok) {
    return data
  }
  throw new Error(data.error)
}

export const deleteReview = async (id: string): Promise<any> => {
  const response = await fetch(`${backUrl}/api/products/reviews/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json()

  if (response.ok) {
    return data
  }
  throw new Error(data.error)
}
