import type { User } from "../entities/user";
import { flexRender, type Row } from "@tanstack/react-table";
import type { HTMLProps } from "react";
import { twJoin } from "tailwind-merge";

export type TableRowProps = {
	row: Row<User>;
	checked: boolean;
} & HTMLProps<HTMLTableRowElement>;

export function TableRow({ checked, row, ...rest }: TableRowProps) {
	return (
		<tr
			className={twJoin([
				checked &&
					"bg-ds-bg-subtle before:absolute before:content-[''] before:rounded-l before:top-0 before:bg-ds-primary before:w-[4px] before:h-[64px]",
				"flex group absolute w-full group rounded gap-2 cursor-pointer",
				"hover:bg-ds-bg-subtle",
			])}
			onClick={row.getToggleSelectedHandler()}
			{...rest}
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
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				);
			})}
		</tr>
	);
}
