/* eslint-disable */
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '6ce8ywjc',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// sanity CMS에서 데이터를 가져오고 이미지 URL을 생성하는 데 필요한 설정
