import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../utils/db'

export async function GET(req: NextRequest, res: NextResponse) {
  const payments = await prisma.payment.findMany()

  return NextResponse.json(payments)
}
