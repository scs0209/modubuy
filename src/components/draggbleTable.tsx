import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  Table,
  createColumnHelper,
} from '@tanstack/react-table'
import { useMemo } from 'react'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      },
    ],
  },
]

export function DraggableTable() {
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

  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', {
        header: () => 'First Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('lastName', {
        header: () => 'Last Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('age', {
        header: () => 'Age',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('visits', {
        header: () => 'Visits',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: () => 'Status',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('progress', {
        header: () => 'Progress',
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper],
  )

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
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
        {JSON.stringify(
          {
            columnSizing: table.getState().columnSizing,
          },
          null,
          2,
        )}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    width: `calc(var(--header-${header?.id}-size) * 1px)`,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
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
        </thead>
      </table>
    </div>
  )
}
