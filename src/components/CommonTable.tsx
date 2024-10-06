'use client'

import React, {
  createContext,
  useContext,
  ReactNode,
  CSSProperties,
} from 'react'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  OnChangeFn,
  Column,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { Pagination as TablePagination } from '@shoplflow/base'

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

export function useTableContext() {
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
  const { getRowModel, getHeaderGroups, getState, setPageIndex, setPageSize } =
    useReactTable({
      data,
      columns,
      state: { sorting },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange,
    })
  const { pageSize, pageIndex } = getState().pagination

  return (
    <>
      <table>
        <thead>
          {getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup?.id}>
              {headerGroup?.headers?.map((header) => {
                const { column } = header

                let sortIndicator = null

                if (header.column.getIsSorted()) {
                  if (header.column.getIsSorted() === 'asc') {
                    sortIndicator = ' 🔼'
                  } else {
                    sortIndicator = ' 🔽'
                  }
                }

                return (
                  <th
                    key={header?.id}
                    onClick={header?.column?.getToggleSortingHandler()}
                    style={{ ...getCommonPinningStyles(column) }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sortIndicator}
                    {!header.isPlaceholder && header.column.getCanPin() && (
                      <div className="flex justify-center gap-1">
                        {header.column.getIsPinned() !== 'left' ? (
                          <button
                            className="px-2 border rounded"
                            onClick={() => {
                              header.column.pin('left')
                            }}
                          >
                            {'<='}
                          </button>
                        ) : null}
                        {header.column.getIsPinned() ? (
                          <button
                            className="px-2 border rounded"
                            onClick={() => {
                              header.column.pin(false)
                            }}
                          >
                            X
                          </button>
                        ) : null}
                        {header.column.getIsPinned() !== 'right' ? (
                          <button
                            className="px-2 border rounded"
                            onClick={() => {
                              header.column.pin('right')
                            }}
                          >
                            {'=>'}
                          </button>
                        ) : null}
                      </div>
                    )}
                  </th>
                )
              })}
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
      <div className="bg-slate-300">
        <TablePagination
          pageSize={`${pageSize}`}
          currentPage={pageIndex}
          pageCount={5}
          itemsTotalCount={data.length}
          pageCount={pageSize}
          previousPage={() => setPageIndex(pageIndex - 1)}
          nextPage={() => setPageIndex(pageIndex + 1)}
          gotoPage={() => {}}
          rightSource={
            <TablePagination.SizeSelector
              data={[
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '20', value: '20' },
                { label: '50', value: '50' },
                { label: '100', value: '100' },
              ]}
              pageSize={`${pageSize}`}
              setPageSize={(value) => setPageSize(Number(value))}
            />
          }
        />
      </div>
    </>
  )
}

Table.Header = Header
Table.Body = Body

export default Table

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}
