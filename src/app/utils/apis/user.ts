import { backUrl } from '@/app/config/url'
import { UpdateUser } from '@/app/interface'
import { toast } from '@/components/ui/use-toast'

export async function fetchUsers() {
  try {
    const response = await fetch(`${backUrl}/api/user/all`, {
      cache: 'no-cache',
    })

    const data = await response.json()
    console.dir(data, { depth: null })

    return data
  } catch (error) {
    console.error('An error occurred while fetching the payment IDs:', error)

    return null
  }
}

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

    return payments
  } catch (error) {
    console.error(error)
  }

  return []
}

export async function fetchUser(userId: string | unknown) {
  try {
    const response = await fetch(`${backUrl}/api/user?userId=${userId}`, {
      cache: 'no-cache',
    })
    const user = await response.json()

    return user
  } catch (error) {
    console.error(error)
  }

  return []
}

export async function updateUser(userId: string, updateData: UpdateUser) {
  try {
    const response = await fetch(`${backUrl}/api/user?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    const data = await response.json()
    toast({
      title: 'User updated successfully!',
    })
  } catch (error) {
    console.error('Failed to update user', error)
  }
}
