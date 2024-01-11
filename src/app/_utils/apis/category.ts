import { client } from '@/app/_lib/sanity'

export async function getCategory() {
  const query = `*[_type == "category"]{
    _id,
    name,
    _type,
    _rev
  }`

  const data = client.fetch(query)

  return data
}

export async function getProductWithCategory(category: string) {
  let query
  if (category === 'all') {
    query = `*[_type == 'product'] {
      _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
    }`
  } else {
    query = `*[_type == 'product' && category->name == '${category}'] {
      _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
    }`
  }

  const data = await client.fetch(query)

  return data
}
