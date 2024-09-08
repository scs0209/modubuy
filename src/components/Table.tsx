'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  OnChangeFn,
} from '@tanstack/react-table'

type TableContextType = {
  fixedColumns: string[]
  columnStyles: Record<string, React.CSSProperties>
}

const TableContext = createContext<TableContextType | undefined>(undefined)

type TableProps = {
  fixedColumns?: string[]
  columnStyles?: Record<string, React.CSSProperties>
  children: ReactNode
}

function Table({ fixedColumns = [], columnStyles = {}, children }: TableProps) {
  return (
    <TableContext.Provider value={{ fixedColumns, columnStyles }}>
      <div className="table-container">{children}</div>
    </TableContext.Provider>
  )
}

function useTableContext() {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('Table compound components must be used within a Table.')
  }
  return context
}

type HeaderProps = {
  total: number
  onSearch: (query: string) => void
}

function Header({ total, onSearch }: HeaderProps) {
  return (
    <div>
      <span>Total: {total}</span>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

type BodyProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
}

function Body<T>({ data, columns, sorting, onSortingChange }: BodyProps<T>) {
  const { getRowModel, getHeaderGroups } = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange,
  })

  return (
    <table>
      <thead>
        {getHeaderGroups()?.map((headerGroup) => (
          <tr key={headerGroup?.id}>
            {headerGroup?.headers?.map((header) => (
              <th
                key={header?.id}
                onClick={header?.column?.getToggleSortingHandler()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getIsSorted()
                  ? header.column.getIsSorted() === 'asc'
                    ? ' 🔼'
                    : ' 🔽'
                  : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type PaginationProps = {
  currentPage: number
  pageCount: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps) {
  return (
    <div>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {currentPage} of {pageCount}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    </div>
  )
}

Table.Header = Header
Table.Body = Body
Table.Pagination = Pagination

export default Table
