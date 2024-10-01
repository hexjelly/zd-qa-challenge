import { useVirtualizer } from "@tanstack/react-virtual";
import { useGetUsers } from "./api/use-get-users";
import {
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type Row,
	type RowSelectionState,
	useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import type { User } from "./entities/user";
import { Button } from "../../components/button";
import { SelectionHeader } from "./components/selection-header";
import { useDeleteUsers } from "./api/use-delete-users";
import SearchIcon from "../../icons/search.svg?react";
import { DebouncedInput } from "../../components/debounced-input";
import { useColumns } from "./helpers/use-columns";
import { TableHeader } from "./components/table-header";
import { TableRow } from "./components/table-row";

export function UserList() {
	const { data } = useGetUsers();
	const { mutate, isPending: deleteUsersIsPending } = useDeleteUsers();

	const columns = useColumns();

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
		{ id: "user", value: "" },
	]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const table = useReactTable({
		data: data?.users ?? [],
		enableRowSelection: true,
		enableMultiRowSelection: true,
		getRowId: (row) => row.id.toString(),
		state: { rowSelection, columnFilters },
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const parentRef = useRef<HTMLDivElement>(null);

	const { rows } = table.getRowModel();
	const userColumn = table.getColumn("user");

	const rowVirtualizer = useVirtualizer({
		gap: 4,
		count: rows.length,
		estimateSize: () => 64, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => parentRef.current,
		// measure dynamic row height, except in firefox because it measures table border height incorrectly
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
					<DebouncedInput
						onChange={(value) => userColumn?.setFilterValue(value)}
						placeholder="Search"
						type="text"
						value={(userColumn?.getFilterValue() ?? "") as string}
						icon={<SearchIcon className="text-ds-subtle" />}
					/>
					<Button type="button">Connect users</Button>
				</div>
			</div>

			<div className="bg-white rounded-lg px-4 py-6 flex flex-col gap-6">
				<SelectionHeader
					selection={rowSelection}
					deleteMutationFn={mutate}
					isPending={deleteUsersIsPending}
					resetTableSelectionFn={table.resetRowSelection}
				/>

				<div
					ref={parentRef}
					className="overflow-auto relative h-[630px] w-[684px]"
				>
					<table className="grid">
						<thead className="grid sticky top-0 z-10 bg-white">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="flex w-full gap-2">
									{headerGroup.headers.map((header) => (
										<TableHeader key={header.id} header={header} />
									))}
								</tr>
							))}
						</thead>
						<tbody
							className="grid relative"
							style={{
								height: `${rowVirtualizer.getTotalSize()}px`,
							}}
						>
							{rowVirtualizer.getVirtualItems().map((virtualRow) => {
								const row = rows[virtualRow.index] as Row<User>;
								const isChecked = rowSelection[row.id] === true;
								return (
									<TableRow
										row={row}
										checked={isChecked}
										data-index={virtualRow.index} // needed for dynamic row height measurement
										ref={(node) => rowVirtualizer.measureElement(node)} // measure dynamic row height
										key={row.id}
										style={{
											transform: `translateY(${virtualRow.start}px)`,
										}}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
