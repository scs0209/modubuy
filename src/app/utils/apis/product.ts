import { client } from '@/app/lib/sanity'

export async function getProduct(id: string) {
  const query = `*[_type == 'product' && _id == "${id}"] {
    _id,
    images[0],
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    price_id,
    product_id,
  }`

  const data = await client.fetch(query)

  return data
}

export async function requestRefund(chargeId: string, paymentId: string) {
  try {
    const response = await fetch(
      `/api/payment/refund?chargeId=${chargeId}&paymentId=${paymentId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const refund = await response.json()
    console.log(refund)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
