import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { User, Role } from "../entities/user";
import { userFilterFn } from "./user-filter";
import { Checkbox } from "../../../components/checkbox";
import { Avatar } from "../../../components/avatar";
import { RoleBadge } from "../components/role-badge";
import { RowActions } from "../components/row-actions";

export function useColumns() {
	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				id: "select",
				enableSorting: false,
				header: ({ table }) => (
					<div className="pl-3 flex items-center">
						<Checkbox
							checked={table.getIsAllRowsSelected()}
							indeterminate={table.getIsSomeRowsSelected()}
							onChange={table.getToggleAllRowsSelectedHandler()}
						/>
					</div>
				),
				cell: ({ row }) => (
					<div className="pl-3 flex items-center">
						<Checkbox
							checked={row.getIsSelected()}
							onChange={row.getToggleSelectedHandler()}
						/>
					</div>
				),
				size: 32,
			},
			{
				accessorKey: "user",
				header: "User",
				id: "user",
				cell: ({ row }) => (
					<Avatar
						email={row.original.email}
						name={row.original.name}
						image={row.original.avatar}
					/>
				),
				sortDescFirst: false,
				sortingFn: (userA, userB, _columnId) => {
					return userA.original.name.localeCompare(userB.original.name);
				},
				filterFn: userFilterFn,
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
				enableSorting: false,
				header: "",
				cell: ({ row }) => <RowActions row={row} />,
			},
		],
		[],
	);

	return columns;
}
