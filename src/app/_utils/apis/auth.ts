import { backUrl } from '@/app/_config/url'
import { toast } from '@/components/ui/use-toast'
import { TSignupSchema } from '@/lib/types'

export async function signUp({ name, email, password }: TSignupSchema) {
  const response = await fetch(`${backUrl}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    toast({ variant: 'destructive', description: 'Registration failed' })
  }

  const result = await response.json()
  toast({
    description: 'Sign up success.',
  })
  return result
}
