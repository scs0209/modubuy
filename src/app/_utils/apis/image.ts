import { client } from '@/app/_lib/sanity'

import { updateUser } from './user'
import { supabaseStorage } from '../supabase'

export async function getHeroImgData() {
  const query = "*[_type == 'heroImage'][0]"

  const data = await client.fetch(query)

  return data
}

export async function uploadImageToStorage(file: File, fileName: string) {
  const { data, error } = await supabaseStorage.storage
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
