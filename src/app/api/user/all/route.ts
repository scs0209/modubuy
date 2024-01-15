import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../_utils/db'

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      payments: true,
      image: true,
    },
  })

  if (!users) {
    return NextResponse.json({ error: 'Users not found' }, { status: 404 })
  }

  return NextResponse.json(users)
}
