import { client } from '@/app/lib/sanity'

export async function getHeroImgData() {
  const query = "*[_type == 'heroImage'][0]"

  const data = await client.fetch(query)

  return data
}
