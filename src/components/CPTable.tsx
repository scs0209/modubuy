// TableContext.tsx
import React, {
  createContext,
  useContext,
  memo,
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  CSSProperties,
} from 'react'
import {
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  Column,
  RowData,
} from '@tanstack/react-table'
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import { Pagination } from '@shoplflow/base'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

export interface Person {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

interface TableContextType<T extends object> {
  table: ReactTable<T>
}

const TableContext = createContext<TableContextType<any> | undefined>(undefined)

export const useTable = <T extends object>() => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTable must be used within a TableProvider')
  }
  return context as TableContextType<T>
}

export const TableProvider = TableContext.Provider

interface TableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  children: React.ReactNode
}

export const Table = <T extends object>({
  data,
  columns,
  children,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnPinning, setColumnPinning] = useState({})

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnPinning,
    },
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // enableColumnResizing: false,
  })

  return <TableProvider value={{ table }}>{children}</TableProvider>
}

const getCommonPinningStyles = (column: Column<Person>): CSSProperties => {
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

type PinningPosition = 'left' | 'right'

interface FixedColumn {
  index: number
  position: PinningPosition
}

interface TableHeaderProps {
  fixedColumns?: FixedColumn[]
}

const TableHeader = memo(
  <T extends object>({
    fixedColumns = [],
    children,
  }: TableHeaderProps & {
    children: (props: any) => React.ReactNode
  }) => {
    const { table } = useTable()

    useMemo(() => {
      const pinningState = { left: [], right: [] }
      fixedColumns.forEach(({ index, position }) => {
        const column = table.getAllColumns()[index]
        if (column?.id) {
          pinningState[position].push(column.id)
        }
      })
      table.setColumnPinning(pinningState)
    }, [fixedColumns, table])

    const columnSizeVars = useMemo(() => {
      const headers = table.getFlatHeaders()
      const colSizes: { [key: string]: number } = {}
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i]!
        colSizes[`--header-${header.id}-size`] = header.getSize()
        colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
      }
      return colSizes
    }, [table.getState().columnSizingInfo, table.getState().columnSizing])

    return (
      <div className="overflow-x-auto">
        <table
          {...{
            style: {
              ...columnSizeVars,
              width: table.getTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) =>
              children({
                headerGroup,
                getCommonPinningStyles,
                flexRender,
                Filter,
              }),
            )}
          </thead>
          {/* <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getCommonPinningStyles(header.column),
                      width: `calc(var(--header-${header?.id}-size) * 1px)`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} />
                      </div>
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
                ))}
              </tr>
            ))}
          </thead> */}
        </table>
      </div>
    )
  },
)

Table.Header = TableHeader

const TableBody = <T extends object>({
  children,
}: {
  children: (props: BodyRenderProps<T>) => React.ReactNode
}) => {
  const { table } = useTable()
  const { rows } = table.getRowModel()
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 33,
    count: rows.length,
    overscan: 10,
  })

  const { getVirtualItems: virtualRows, getTotalSize } = rowVirtualizer
  const paddingTop =
    virtualRows().length > 0 ? virtualRows()?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows().length > 0
      ? getTotalSize() - (virtualRows()?.[virtualRows().length - 1]?.end || 0)
      : 0

  const renderRow = useCallback(
    (virtualRow: VirtualItem) => {
      const row = rows[virtualRow.index]
      return (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <td
                key={cell.id}
                style={{
                  ...getCommonPinningStyles(cell.column),
                  display: 'flex',
                  width: cell.column.getSize(),
                  color: 'black',
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )
          })}
        </tr>
      )
    },
    [rows],
  )

  return (
    <div ref={tableContainerRef} style={{ height: '400px', overflow: 'auto' }}>
      <table>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {children({
            virtualRows,
            rows,
            getCommonPinningStyles,
            flexRender,
          })}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
        {/* <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
          {virtualRows().map((row) => renderRow(row))}
          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  )
}

Table.Body = TableBody

const TablePagination: React.FC = memo(() => {
  const { table } = useTable()
  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <div>
      <Pagination
        pageSize={`${pageSize}`}
        currentPage={pageIndex}
        pageCount={pageSize}
        itemsTotalCount={table.getTotalSize()}
        previousPage={() => table.previousPage()}
        nextPage={() => table.nextPage()}
        gotoPage={() => {}}
        rightSource={
          <Pagination.SizeSelector
            data={[
              { label: '5', value: '5' },
              { label: '10', value: '10' },
              { label: '20', value: '20' },
              { label: '50', value: '50' },
              { label: '100', value: '100' },
            ]}
            pageSize={`${pageSize}`}
            setPageSize={(value) => table.setPageSize(Number(value))}
          />
        }
      />
    </div>
  )
})

Table.Pagination = TablePagination

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}

  const sortedUniqueValues =
    filterVariant === 'range'
      ? []
      : Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000)

  console.log(column.getFacetedUniqueValues().keys())

  return filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      {sortedUniqueValues.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  ) : (
    <DebouncedInput
      className="border rounded shadow w-36"
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Search..."
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

// interface TableColumnProps {
//   id: string
//   header: string
// }

// const TableColumn: React.FC<TableColumnProps> = memo(({ id, header }) => {
//   const { addColumn } = useTable()

//   useEffect(() => {
//     addColumn({
//       id,
//       header: () => header,
//       accessorKey: id,
//     })
//   }, [id, header, addColumn])

//   return null
// })

// Table.Column = TableColumn
