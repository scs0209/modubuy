import { backUrl } from '@/app/config/url'

export const toggleLike = async (
  userId: string | unknown,
  productId: string,
) => {
  const response = await fetch(`${backUrl}/api/products/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, productId }),
  })

  const data = await response.json()

  if (response.ok) {
    console.log(
      `상품의 좋아요 상태가 변경되었습니다. 현재 상태: ${data.status}`,
    )
  } else {
    console.error(`좋아요 상태 변경에 실패했습니다: ${data.error}`)
  }
}

export const fetchLikes = async (userId: string) => {
  const response = await fetch(
    `${backUrl}/api/products/likes?userId=${userId}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const data = await response.json()

  if (response.ok) {
    console.log(`사용자가 좋아요한 상품들: `, data)
    return data
  }
  console.error(`좋아요한 상품들을 가져오는 데 실패했습니다: ${data.error}`)
  throw new Error(data.error)
}
