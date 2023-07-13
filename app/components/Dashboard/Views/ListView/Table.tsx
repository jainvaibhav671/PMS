import { usePushProject } from "@/lib/atoms";
import { Project } from "@/lib/database.types";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

export default function Table({
    projects
}: {
    projects: Project[]
}) {
    const pushProject = usePushProject();
  const columnHelper = createColumnHelper<Project>();
  const columns = [
    columnHelper.accessor("id", {
        cell: info => info.getValue().toUpperCase(),
    }),
    columnHelper.accessor("name", {
        cell: info => info.getValue().toUpperCase(),
    }),
    columnHelper.accessor("priority", {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("deadline", {
        cell: info => (new Date(info.getValue() as string).toLocaleString("default", {
            dateStyle: "medium"
        })),
    })
  ]

  const table = useReactTable({
    data: projects!,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  })

  return <div>
    <table className="list-view">
        <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.slice(1).map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder ? null : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => (
                <tr 
                    className="project-row"
                    onClick={() => pushProject({
                        name: row.getValue("name"), id: row.getValue("id")
                    })}
                    key={row.id}
                >
                    {row.getVisibleCells().slice(1).map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  </div>;
}
