import fs from 'fs'
import { getFakeDocumentList } from './fakeData.js'

// JSON 파일 생성 함수
export const createJsonFile = () => {
  const fakeDocumentList = getFakeDocumentList({ page: 0, records: 100 })
  fs.writeFileSync(
    'data.json',
    JSON.stringify(fakeDocumentList, null, 2),
    'utf-8',
  )
}

createJsonFile()
