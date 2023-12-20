import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../utils/db'

export async function GET(req: Request, res: NextApiResponse) {
  // 모든 유저를 데이터베이스에서 가져옵니다.
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      payments: true,
    },
  })

  // 유저가 없는 경우, 404 에러를 반환합니다.
  if (!users) {
    return res.status(404).json({ error: 'Users not found' })
  }

  return NextResponse.json(users)
}
