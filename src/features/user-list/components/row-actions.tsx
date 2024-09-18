import { type MouseEventHandler, useCallback } from "react";
import { Button } from "../../../components/button";
import EditIcon from "../../../icons/edit.svg?react";
import TrashIcon from "../../../icons/trash.svg?react";
import { useDeleteUser } from "../api/use-delete-user";
import type { Row } from "@tanstack/react-table";
import type { User } from "../entities/user";

export type RowActionsProps = {
	row: Row<User>;
};

export function RowActions({ row }: RowActionsProps) {
	const { mutate, isPending } = useDeleteUser();

	const rowDeleteHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			event.stopPropagation();
			mutate({ userId: row.id });
			row.toggleSelected(false);
		},
		[row, mutate],
	);

	const rowEditHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			event.stopPropagation();
		},
		[],
	);

	return (
		<div className="flex items-center gap-1">
			<Button
				variant="secondary"
				shadow="sm"
				size="sm"
				type="button"
				icon={EditIcon}
				onClick={rowEditHandler}
			>
				Edit
			</Button>
			<Button
				disabled={isPending}
				variant="secondary"
				shadow="sm"
				size="sm"
				type="button"
				icon={TrashIcon}
				onClick={rowDeleteHandler}
			/>
		</div>
	);
}
