'use client'

import { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Person, Table } from './CPTable'

// function TableView() {
//   const [data] = useState([
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신청서23123',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//     {
//       clientId: 'DEV_192555AE2EE93F86',
//       title: '신ddsafkjfdkj',
//       documentStatus: 'SENDING',
//       regUserInfo: { userName: '성창수', phone: '01086655745' },
//       regDt: '2024-08-28T04:16:52Z',
//     },
//   ])
//   const [sorting, setSorting] = useState<SortingState>([])

//   const columns: ColumnDef<any>[] = [
//     { accessorKey: 'title', header: 'Title' },
//     { accessorKey: 'documentStatus', header: 'Status' },
//     { accessorKey: 'regUserInfo.userName', header: 'User Name' },
//     { accessorKey: 'regUserInfo.phone', header: 'Phone' },
//     { accessorKey: 'regDt', header: 'Registered Date' },
//   ]

//   const handleSearch = (query: string) => {
//     // 검색 로직을 추가합니다.
//   }

//   const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
//     setSorting((prev) =>
//       typeof updaterOrValue === 'function'
//         ? updaterOrValue(prev)
//         : updaterOrValue,
//     )
//   }

//   return (
//     <Table>
//       <Table.Header total={data.length} onSearch={handleSearch} />
//       <Table.Body
//         data={data}
//         columns={columns}
//         sorting={sorting}
//         onSortingChange={handleSortingChange}
//       />
//     </Table>
//   )
// }

function TableView() {
  const data = useMemo<Person[]>(
    () =>
      Array.from({ length: 100 }, (_, index) => ({
        id: index,
        firstName: `First${index}`,
        lastName: `Last${index}`,
        age: Math.floor(Math.random() * 100),
        visits: Math.floor(Math.random() * 100),
        status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
        progress: Math.floor(Math.random() * 100),
      })),
    [],
  )

  const columnHelper = createColumnHelper<Person>()

  const columns = useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        meta: {
          filterVariant: 'range',
        },
      },
    ],
    [],
  )

  return (
    <Table data={data} columns={columns}>
      <Table.Header
        fixedColumns={[
          { index: 0, position: 'left' },
          { index: columns.length - 1, position: 'right' },
        ]}
      />
      <Table.Body />
      {/* <Table.Pagination /> */}
    </Table>
  )
}

export default TableView
