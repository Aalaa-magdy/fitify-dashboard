import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

export default function Table({
  columns,
  data,
  className = '',
}) {
  return (
    <div className={`w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm ${className}`}>
      <table className="w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns?.map((column) => (
              <th
                key={column.accessor}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && (
                    <button className="ml-1 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.accessor}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                >
                  {column.cell ? column.cell(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


