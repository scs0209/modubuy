import { client } from '@/app/lib/sanity'

export async function getProduct(id: string) {
  const query = `*[_type == 'product' && _id == "${id}"] {
    _id,
    images,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    price_id,
    product_id,
  }`

  const data = await client.fetch(query)

  return data
}
