export interface simplifiedProduct {
  _id: string
  imageUrl: string
  price: number
  slug: string
  categoryName: string
  name: string
}

export interface fullProduct {
  _id: string
  images: Image[]
  price: number
  slug: string
  categoryName: string
  name: string
  description: string
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
