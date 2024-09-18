import type { Row } from "@tanstack/react-table";
import type { User } from "../entities/user";

export const userFilterFn = (
	row: Row<User>,
	_columnId: string,
	filterValue: string,
) =>
	row.original.name.toLocaleLowerCase().trim().includes(filterValue) ||
	row.original.email.toLocaleLowerCase().trim().includes(filterValue);

// remove the filter value from filter state if it is falsy (empty string in this case)
userFilterFn.autoRemove = (val: string) => !val;

// transform/sanitize/format the filter value before it is passed to the filter function
userFilterFn.resolveFilterValue = (val: string) => val.toLowerCase().trim();
