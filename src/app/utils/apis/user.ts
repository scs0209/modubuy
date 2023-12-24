import { backUrl } from '@/app/config/url'

export async function fetchUserWithPayments(userId: string | unknown) {
  try {
    const response = await fetch(`${backUrl}/api/payment?userId=${userId}`)
    const paymentIds = await response.json()

    const payments = await Promise.all(
      paymentIds.map(async (paymentId: string) => {
        const result = await fetch(`${backUrl}/api/payment/${paymentId}`)
        return result.json()
      }),
    )

    return payments // 결제 정보 배열 반환
  } catch (error) {
    console.error(error)
  }

  return []
}

export async function fetchUser(userId: string | unknown) {
  try {
    const response = await fetch(`${backUrl}/api/user?userId=${userId}`)
    const user = await response.json()

    return user
  } catch (error) {
    console.error(error)
  }

  return []
}
