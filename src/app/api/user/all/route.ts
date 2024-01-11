import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../_utils/db'

export async function GET(req: Request, res: NextApiResponse) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      payments: true,
    },
  })

  if (!users) {
    return res.status(404).json({ error: 'Users not found' })
  }

  return NextResponse.json(users)
}
