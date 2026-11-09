
import type { ReactNode, Key } from "react";

type TableColumn<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  rowKey?: keyof T;
};

function Table<T>({
  columns,
  data,
  emptyMessage = "No data found",
  rowKey,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-5 py-4 font-semibold whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={
                  rowKey
                    ? (row[rowKey] as Key)
                    : index
                }
                className="hover:bg-slate-50 transition"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-5 py-4 text-slate-700 whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center text-slate-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
