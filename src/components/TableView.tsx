'use client'

import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import Table from './Table'

function TableView() {
  const [data] = useState([
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신청서23123',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    {
      clientId: 'DEV_192555AE2EE93F86',
      title: '신ddsafkjfdkj',
      documentStatus: 'SENDING',
      regUserInfo: { userName: '성창수', phone: '01086655745' },
      regDt: '2024-08-28T04:16:52Z',
    },
    // JSON 데이터를 더 추가하세요.
  ])
  const [sorting, setSorting] = useState<SortingState>([])
  const [currentPage, setCurrentPage] = useState(1)

  const columns: ColumnDef<any>[] = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'documentStatus', header: 'Status' },
    { accessorKey: 'regUserInfo.userName', header: 'User Name' },
    { accessorKey: 'regUserInfo.phone', header: 'Phone' },
    { accessorKey: 'regDt', header: 'Registered Date' },
  ]

  const handleSearch = (query: string) => {
    // 검색 로직을 추가합니다.
  }

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((prev) =>
      typeof updaterOrValue === 'function'
        ? updaterOrValue(prev)
        : updaterOrValue,
    )
  }

  return (
    <Table>
      <Table.Header total={data.length} onSearch={handleSearch} />
      <Table.Body
        data={data}
        columns={columns}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />
      <Table.Pagination
        currentPage={currentPage}
        pageCount={Math.ceil(data.length / 10)}
        onPageChange={setCurrentPage}
      />
    </Table>
  )
}

export default TableView
