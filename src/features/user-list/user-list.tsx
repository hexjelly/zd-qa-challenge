import { useVirtualizer } from "@tanstack/react-virtual";
import { useGetUsers } from "./api/use-get-users";
import {
	CellContext,
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type Row,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useRef } from "react";
import type { User } from "./entities/user";
import { formatPermission } from "./helpers/format-permission";

export function UserList() {
	const { data } = useGetUsers();

	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				accessorKey: "user",
				header: "User",
				cell: ({ row }) => (
					<Avatar
						email={row.original.email}
						name={row.original.name}
						image={row.original.avatar}
					/>
				),
				size: 370,
			},
			{
				accessorKey: "role",
				header: "Permission",
				cell: (cell) => formatPermission(cell.getValue() as string),
				size: 250,
			},
			{
				accessorKey: "controls",
				size: 300,
				header: "",
				cell: () => (
					<div>
						<button type="button">Edit</button>
						<button type="button">Delete</button>
					</div>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data: data?.users ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const parentRef = useRef<HTMLDivElement>(null);

	const { rows } = table.getRowModel();
	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 50, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => parentRef.current,
		//measure dynamic row height, except in firefox because it measures table border height incorrectly
		measureElement:
			typeof window !== "undefined" &&
			navigator.userAgent.indexOf("Firefox") === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 5,
	});

	return (
		<div ref={parentRef} className="overflow-auto relative h-[700px]">
			<table className="grid">
				<thead
					style={{
						display: "grid",
						position: "sticky",
						top: 0,
						zIndex: 1,
					}}
				>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
							{headerGroup.headers.map((header) => {
								return (
									<th
										key={header.id}
										style={{
											display: "flex",
											width: header.getSize(),
										}}
									>
										<div
											{...{
												className: header.column.getCanSort()
													? "cursor-pointer select-none"
													: "",
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{{
												asc: " 🔼",
												desc: " 🔽",
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody
					style={{
						display: "grid",
						height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
						position: "relative", //needed for absolute positioning of rows
					}}
				>
					{rowVirtualizer.getVirtualItems().map((virtualRow) => {
						const row = rows[virtualRow.index] as Row<User>;
						return (
							<tr
								data-index={virtualRow.index} //needed for dynamic row height measurement
								ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
								key={row.id}
								style={{
									display: "flex",
									position: "absolute",
									transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
									width: "100%",
								}}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<td
											key={cell.id}
											style={{
												display: "flex",
												width: cell.column.getSize(),
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
