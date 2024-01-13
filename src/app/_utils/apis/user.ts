import { backUrl } from '@/app/_config/url'
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

export async function updateUser(
  userId: string | undefined,
  updateData: UpdateUser,
) {
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

export async function deleteUser(userId: string) {
  try {
    const response = await fetch(`${backUrl}/api/user?userId=${userId}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error('An error occurred while deleting the user:', error)

    return null
  }
}

export async function requestTempPassword(email: string, receiveEmail: string) {
  try {
    const response = await fetch(`${backUrl}/api/user/find-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, receiveEmail }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    if (data.error) {
      console.error(data.error)
      return
    }

    toast({ description: 'Send email success.' })
  } catch (error) {
    console.error('There has been a problem with your fetch operation: ', error)
  }
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
) {
  const response = await fetch(`${backUrl}/api/user/change-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }

  toast({
    description: 'Update password success!',
  })
  return response.json()
}
