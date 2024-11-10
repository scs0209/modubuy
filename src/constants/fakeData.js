import { faker } from '@faker-js/faker'

const generateFakeDocumentInfo = () => ({
  clientId: faker.string.uuid(),
  completeCnt: faker.number.int({ min: 0, max: 100 }),
  completeRate: faker.number.float({ min: 0, max: 1 }),
  documentGroupId: faker.string.uuid(),
  documentId: faker.string.uuid(),
  documentType: faker.helpers.arrayElement(['ACTIVE', 'PASSIVE']),
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  documentStatus: faker.helpers.arrayElement([
    'TEMPS_SAVE',
    'SENDING',
    'RESERVED',
    'CANCELED',
    'WITHDRAW',
  ]),
  reserveDt: faker.date.future().toISOString(),
  isDelete: faker.datatype.boolean(),
  regUserInfo: { id: faker.string.uuid(), name: faker.person.fullName() },
  regDt: faker.date.past().toISOString(),
  modUserInfo: { id: faker.string.uuid(), name: faker.person.fullName() },
  modDt: faker.date.recent().toISOString(),
  delUserInfo: { id: faker.string.uuid(), name: faker.person.fullName() },
  delDt: faker.date.recent().toISOString(),
  viewerType: faker.helpers.arrayElement(['VIEWER1', 'VIEWER2']),
  recipientCnt: faker.number.int({ min: 1, max: 20 }),
  documentViewerList: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      viewerId: faker.string.uuid(),
      viewerName: faker.person.fullName(),
    }),
  ),
  recipientType: faker.helpers.arrayElement(['PERSONAL', 'GROUP']),
  documentRecipientList: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }),
  ),
  documentAttachFileInfo: {
    fileId: faker.string.uuid(),
    fileName: faker.system.fileName(),
    fileSize: faker.number.int({ min: 1000, max: 100000 }),
  },
  attachFileId: faker.string.uuid(),
  documentCpntInfoList: Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => ({
      componentId: faker.string.uuid(),
      componentName: faker.lorem.word(),
    }),
  ),
  documentThumbnailInfo: faker.image.url(),
  documentThumbnailPath: faker.system.filePath(),
  documentTaskList: Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => ({
      taskId: faker.string.uuid(),
      taskName: faker.lorem.word(),
    }),
  ),
  isFavorites: faker.datatype.boolean(),
  favoritesIdx: faker.number.int({ min: 0, max: 100 }),
  taskCnt: faker.number.int({ min: 0, max: 10 }),
  recipientInfoList: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }),
  ),
})

export const getFakeDocumentList = ({
  page = 0,
  records = 10,
  direction = 'ASC',
  sortItem = 'title',
  searchText,
  searchDocumentStatus,
}) => {
  // 100개의 가짜 데이터를 생성
  const data = Array.from({ length: 100 }, generateFakeDocumentInfo)

  // 필터링 (예: 문서 상태나 텍스트 검색)
  const filteredData = data.filter((item) => {
    if (searchDocumentStatus && item.documentStatus !== searchDocumentStatus)
      return false
    if (searchText && !item.title.includes(searchText)) return false
    return true
  })

  // 정렬
  const sortedData = filteredData.sort((a, b) => {
    const aValue = a[sortItem]
    const bValue = b[sortItem]
    if (aValue < bValue) return direction === 'ASC' ? -1 : 1
    if (aValue > bValue) return direction === 'ASC' ? 1 : -1
    return 0
  })

  // 페이지네이션
  const pagedData = sortedData.slice(page * records, (page + 1) * records)

  return {
    content: pagedData,
    empty: pagedData.length === 0,
    last: (page + 1) * records >= sortedData.length,
    page,
    size: records,
    total: sortedData.length,
    totalElements: sortedData.length,
  }
}
