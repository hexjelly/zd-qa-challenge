import { useVirtualizer } from "@tanstack/react-virtual";
import { useGetUsers } from "./api/use-get-users";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type Row,
	type RowSelectionState,
	useReactTable,
} from "@tanstack/react-table";
import {
	type MouseEventHandler,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import type { Role, User } from "./entities/user";
import { Avatar } from "../../components/avatar";
import { Checkbox } from "../../components/checkbox";
import { Button } from "../../components/button";
import { RoleBadge } from "./components/role-badge";
import EditIcon from "../../icons/edit.svg?react";
import TrashIcon from "../../icons/trash.svg?react";
import { twJoin } from "tailwind-merge";
import { RowActions } from "./components/row-actions";

export function UserList() {
	const { data } = useGetUsers();

	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={table.getIsAllRowsSelected()}
						indeterminate={table.getIsSomeRowsSelected()}
						onChange={table.getToggleAllRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onChange={row.getToggleSelectedHandler()}
					/>
				),
				size: 20,
			},
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
				cell: (cell) => <RoleBadge role={cell.getValue() as Role} />,
				size: 140,
			},
			{
				accessorKey: "controls",
				size: 115,
				header: "",
				cell: ({ row }) => <RowActions row={row} />,
			},
		],
		[],
	);

	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable({
		data: data?.users ?? [],
		enableRowSelection: true,
		enableMultiRowSelection: true,
		getRowId: (row) => row.id.toString(),
		state: { rowSelection },
		onRowSelectionChange: setRowSelection,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const parentRef = useRef<HTMLDivElement>(null);

	const { rows } = table.getRowModel();

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 64, //estimate row height for accurate scrollbar dragging
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
		<div className="p-8 flex flex-col gap-[18px]	">
			<div className="flex justify-between gap-3 items-center">
				<h2 className="font-medium text-lg">Account users</h2>
				<div className="flex gap-3">
					<input placeholder="Search" />
					<Button type="button">Connect users</Button>
				</div>
			</div>

			<div className="bg-white rounded-lg p-4">
				<div className="flex gap-6 items-center">
					<h3 className="text-ds-fg-2 font-medium">
						{Object.keys(rowSelection).length} users selected
					</h3>

					<div className="flex items-center gap-2">
						<Button
							variant="secondary"
							shadow="sm"
							size="sm"
							type="button"
							icon={EditIcon}
						>
							Edit
						</Button>
						<Button
							variant="secondary"
							shadow="sm"
							size="sm"
							type="button"
							icon={TrashIcon}
						>
							Delete
						</Button>
					</div>
				</div>

				<div
					ref={parentRef}
					className="overflow-auto relative h-[615px] w-[684px]"
				>
					<table className="grid">
						<thead className="grid sticky top-0 z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="flex w-full gap-2">
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
							className="grid relative space-y-1"
							style={{
								height: `${rowVirtualizer.getTotalSize()}px`,
							}}
						>
							{rowVirtualizer.getVirtualItems().map((virtualRow) => {
								const row = rows[virtualRow.index] as Row<User>;
								const isChecked = rowSelection[row.id] === true;
								return (
									// biome-ignore lint: onKey handler for tr requires too much effort right now
									<tr
										data-index={virtualRow.index} //needed for dynamic row height measurement
										ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
										key={row.id}
										className={twJoin([
											isChecked &&
												"bg-ds-bg-subtle before:absolute before:content-[''] before:rounded-l before:top-0 before:bg-ds-primary before:w-[4px] before:h-[64px]",
											"flex absolute w-full group rounded gap-2 cursor-pointer",
											"hover:bg-ds-bg-subtle",
										])}
										style={{
											transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
										}}
										onClick={row.getToggleSelectedHandler()}
									>
										{row.getVisibleCells().map((cell) => {
											return (
												<td
													key={cell.id}
													className="flex h-[64px] group:data"
													style={{
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
			</div>
		</div>
	);
}
