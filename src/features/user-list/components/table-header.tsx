import { type Header, flexRender } from "@tanstack/react-table";
import type { User } from "../entities/user";
import ArrowDownIcon from "../../../icons/arrow-down.svg?react";

export type TableHeaderProps = {
	header: Header<User, unknown>;
};

export function TableHeader({ header }: TableHeaderProps) {
	return (
		<th
			key={header.id}
			className="text-ds-subtle flex text-xs font-medium"
			style={{
				width: header.getSize(),
			}}
		>
			<div
				{...{
					className: header.column.getCanSort()
						? "cursor-pointer select-none flex gap-1 items-center"
						: "",
					onClick: header.column.getToggleSortingHandler(),
				}}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
				{{
					asc: <ArrowDownIcon />,
					desc: <ArrowDownIcon className="rotate-180" />,
				}[header.column.getIsSorted() as string] ?? null}
			</div>
		</th>
	);
}
