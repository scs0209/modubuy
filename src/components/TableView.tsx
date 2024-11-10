'use client'

import { ColumnDef, createColumnHelper, SortingFn } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { DocumentData, DocumentDataList } from '@/lib/types'
import { useState } from 'react'
import { Table } from './CPTable'
import SearchBar from './SearchBar'

const dropdownItem = [
  { label: '문서명', value: 'TITLE' },
  { label: '발송자', value: 'SENDER' },
  { label: '수신자', value: 'RECIPIENT' },
]

// custom sorting logic for one of our enum columns
const sortStatusFn: SortingFn<DocumentData> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.completeCnt
  const statusB = rowB.original.completeCnt
  return statusA - statusB
}

function TableView() {
  const { data, error, isLoading } = useQuery<DocumentDataList>({
    queryKey: ['fetchData'],
    queryFn: async () => {
      const response = await fetch('./data.json')
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    },
  })
  const [isSortMenuOpen, setSortMenuOpen] = useState(false)

  const columnHelper = createColumnHelper<DocumentData>()

  const columns = [
    columnHelper.accessor('title', {
      header: '문서명',
      cell: (props) => props.getValue(),
      meta: {
        filterVariant: 'select',
        filterOptions: [
          { label: 'All', value: '' },
          { label: 'High Priority', value: 'high' },
          { label: 'Low Priority', value: 'low' },
        ],
      },
      size: 250,
    }),
    columnHelper.accessor('completeCnt', {
      header: '완료율',
      cell: (props) => props.getValue(),
      meta: {
        sortLabels: ['최신순', '느린순', '기본'],
      },
      sortingFn: sortStatusFn,
      enableSorting: true,
      size: 250,
    }),
    columnHelper.accessor('regUserInfo', {
      header: '발신자',
      cell: (props) => props.getValue().name,
      meta: {
        filterVariant: 'select',
        filterOptions: [
          { label: 'High Priority', value: 'high' },
          { label: 'Low Priority', value: 'low' },
        ],
      },
      size: 250,
    }),
  ] as ColumnDef<DocumentData>[]

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Table data={data?.content || []} columns={columns}>
      <SearchBar
        category
        dropdownItems={dropdownItem}
        selectedDropdownItem={{
          label: '문서명',
          value: 'TITLE',
        }}
        type="real-time"
      />
      <Table.Header
        fixedColumns={[
          { index: 0, position: 'left' },
          { index: columns.length - 1, position: 'right' },
        ]}
      >
        {({
          headerGroup,
          getCommonPinningStyles,
          flexRender,
          Filter,
          SortMenu,
        }) => (
          <tr>
            {headerGroup.headers.map((header) => {
              const handleSortChange = (direction: 'asc' | 'desc' | false) => {
                header.column.toggleSorting(
                  direction === 'asc' ? 'asc' : 'desc',
                )
                setSortMenuOpen(false)
              }
              return (
                <th
                  key={header.id}
                  style={{
                    ...getCommonPinningStyles(header.column),
                    width: `calc(var(--header-${header?.id}-size) * 1px)`,
                  }}
                  // onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <button
                    onClick={() => setSortMenuOpen((prev) => !prev)}
                    className="sort-button"
                  >
                    🔽
                  </button>
                  {isSortMenuOpen && (
                    <SortMenu
                      column={header.column}
                      onSortChange={handleSortChange}
                    />
                  )}
                  {/* {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null} */}
                  {header.column.getCanFilter() ? (
                    <Filter
                      column={header.column}
                      onFilterChange={(value) =>
                        console.log(`Filter changed to: ${value}`)
                      }
                    />
                  ) : null}
                  <div
                    {...{
                      onDoubleClick: () => header.column.resetSize(),
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`,
                    }}
                  />
                </th>
              )
            })}
          </tr>
        )}
      </Table.Header>
      <Table.Body>
        {({ virtualRows, rows, getCommonPinningStyles, flexRender }) => (
          <>
            {virtualRows().map((virtualRow) => {
              const row = rows[virtualRow.index]
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={getCommonPinningStyles(cell.column)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </>
        )}
      </Table.Body>
      <Table.Pagination />
    </Table>
  )
}

export default TableView

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
