import { client } from '@/app/_lib/sanity'
import { clientStripe } from '@/app/_lib/stripe'

export async function getAllProduct() {
  const query = `*[_type == 'product'] {
    _id,
      images,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      price_id,
      product_id,
  }`

  const data = client.fetch(query)

  return data
}

export async function getProductWithID(id: string) {
  const query = `*[_type == 'product' && _id == "${id}"] {
    _id,
    images[0],
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

export async function getDetailProduct(slug: string) {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0] {
    _id,
      images,
      price,
      name,
      description,
      "slug": slug.current,
      "categoryName": category->name,
      price_id,
  }`

  const data = client.fetch(query)

  return data
}

const deleteProductInStripe = async (stripeProductId: string) => {
  try {
    await clientStripe.products.update(stripeProductId, { active: false })
    console.log('Product deleted in Stripe successfully')
  } catch (error) {
    console.error('Failed to delete the product in Stripe', error)
  }
}

const deleteProductInSanity = async (productId: string) => {
  try {
    await client.delete(productId)
    console.log('Product deleted in Sanity successfully')
  } catch (error) {
    console.error('Failed to delete the product in Sanity', error)
  }
}

export const deleteProduct = async (
  productId: string,
  stripeProductId: string,
) => {
  await deleteProductInStripe(stripeProductId)
  await deleteProductInSanity(productId)
}
