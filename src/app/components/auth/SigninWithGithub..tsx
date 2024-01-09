'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function SigninWithGithub() {
  const handleSignIn = async () => {
    try {
      const result = await signIn('github', {
        callbackUrl: `${window.location.origin}`,
      })
      if (result?.error) {
        toast({ variant: 'destructive', description: '로그인에 실패했습니다.' })
      } else {
        toast({ description: '성공적으로 로그인했습니다.' })
      }
    } catch (error) {
      toast({ variant: 'destructive', description: `${error}` })
    }
  }

  return (
    <Button onClick={handleSignIn} className="mt-6" variant="secondary">
      Login with Github <Github className="w-4 h-4 ml-4" />
    </Button>
  )
}
