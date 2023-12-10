import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SignInForm from '../components/auth/SignInForm'
import SigninWithGithub from '../components/auth/SigninWithGithub.'

export default async function LoginPage() {
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
