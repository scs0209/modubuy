import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../utils/auth'
import SignInForm from '../_components/auth/SignInForm'
import SigninWithGithub from '../_components/auth/SigninWithGithub.'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    return redirect('/')
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in </CardTitle>
          <CardDescription>
            To access the private page you have to be authenticated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <SignInForm />

            <SigninWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
