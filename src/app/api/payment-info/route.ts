import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  try {
    const payments = await prisma.payment.findMany({
      where: { userId },
    })

    return NextResponse.json(payments)
  } catch (err: any) {
    return NextResponse.json({ statusCode: 500, message: err.message })
  }
}
