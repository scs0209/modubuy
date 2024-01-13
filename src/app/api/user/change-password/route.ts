import { authOptions } from '@/app/_utils/auth'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../_utils/db'
import { compare, hash } from 'bcrypt'

export async function PUT(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json()
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error('Email is not available')
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }

  if (!user.password) {
    throw new Error('Password is not available')
  }

  const isValid = await compare(currentPassword, user.password)
  if (!isValid) {
    return NextResponse.json(
      { error: 'Current password is incorrect' },
      { status: 400 },
    )
  }

  // 새로운 비밀번호 해싱
  const hashedPassword = await hash(newPassword, 10)

  // 비밀번호 업데이트
  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword },
  })

  return NextResponse.json(
    { message: 'Password updated successfully' },
    { status: 200 },
  )
}
