import { client } from '@/app/_lib/sanity'
import { createClient } from '@supabase/supabase-js'
import { updateUser } from './user'

export async function getHeroImgData() {
  const query = "*[_type == 'heroImage'][0]"

  const data = await client.fetch(query)

  return data
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export async function uploadImageToStorage(file: File, fileName: string) {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading image: ', error)
    return null
  }

  return data
}

export async function updateUserImage(
  userId: string | undefined,
  fileName: string,
) {
  try {
    const response = await updateUser(userId, { image: fileName })
    return response
  } catch (error) {
    console.error('Error updating user: ', error)
    return null
  }
}
