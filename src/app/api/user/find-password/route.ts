import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import sendTempPasswordEmail from '@/app/_lib/mailer'
import prisma from '../../../../lib/db'

export async function POST(req: NextRequest) {
  const { email, receiveEmail } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    // 임시 비밀번호 생성
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await hash(tempPassword, 12)

    // 데이터베이스 업데이트
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    // 이메일 발송
    await sendTempPasswordEmail(receiveEmail, tempPassword)

    return NextResponse.json(
      { message: '임시 비밀번호가 발급되었습니다.' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: '임시 비밀번호 발급에 실패했습니다. 다시 시도해주세요.' },
      { status: 500 },
    )
  }
}
