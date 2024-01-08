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

export interface FullPayment {
  id: string
  userId: string
  chargeId: string
  paymentId: string
  amount: number
  status: string
  product: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  address: string
  detail_address: string
  payments: Payment[]
}

export interface UpdateUser {
  id?: string
  name: string
  email: string
  role?: 'user' | 'admin'
  address?: string
  detail_address?: string
  payments?: Payment[]
}

export interface Category {
  _id: string
  name: string
  _type: string
  _rev: string
}

export interface Review {
  id: string
  content: string
  rating: number
  createdAt: string
  updatedAt: string
  userId: string
  productId: string
  user: User
}

export interface LikesProduct {
  name: string
  slug: string
  categoryName: string
  price_id: string
  product_id: string
  _id: string
  images: Images
  price: number
}

export interface Images {
  _key: string
  asset: Asset
  _type: string
}

export interface Asset {
  _ref: string
  _type: string
}

export interface Like {
  userId: string
  productId: string
  createdAt: string
}
