import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import prisma from '../../_utils/db'

export async function GET(req: NextRequest) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      address: true,
      detail_address: true,
      image: true,
      role: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  return NextResponse.json(deletedUser)
}

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
)

export async function PUT(req: NextRequest) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const updateData = await req.json()

  if (updateData.image) {
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(updateData.image)

    // 이미지 URL을 updateData에 추가합니다.
    updateData.image = publicUrl
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  })

  return NextResponse.json(updatedUser)
}
