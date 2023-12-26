export interface simplifiedProduct {
  _id: string
  imageUrl: string
  price: number
  slug: string
  categoryName: string
  name: string
  product_id: string
}

export interface fullProduct {
  _id: string
  images: Image[]
  price: number
  slug: string
  categoryName: string
  name: string
  description: string
  price_id: string
}

export interface ImageAsset {
  _ref: string
  _type: string
}

export interface Image {
  _type: string
  _key: string
  asset: ImageAsset
}

export interface Payment {
  id: string
  chargeId: string
  amount: number
  status: string
  product: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  payments: Payment[]
}

export interface UpdateUser {
  name: string
  email: string
  role: 'user' | 'admin'
  payments?: Payment[]
}

export interface Category {
  _id: string
  name: string
  _type: string
  _rev: string
}
