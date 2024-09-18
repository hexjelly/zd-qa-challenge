import type { RowSelectionState } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { Button } from "../../../components/button";
import EditIcon from "../../../icons/edit.svg?react";
import TrashIcon from "../../../icons/trash.svg?react";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { DeleteUsersResponse } from "../api/delete-users";

export type SelectionHeaderProps = {
	selection: RowSelectionState;
	deleteMutationFn: UseMutateFunction<
		DeleteUsersResponse,
		Error,
		{
			userIds: string[];
		},
		unknown
	>;
	isPending: boolean;
};

export function SelectionHeader({
	selection,
	deleteMutationFn,
	isPending,
}: SelectionHeaderProps) {
	const selectedCount = useMemo(
		() => Object.keys(selection).length,
		[selection],
	);

	const deleteUsers = useCallback(() => {
		const userIdsToDelete = Object.keys(selection);
		deleteMutationFn({ userIds: userIdsToDelete });
	}, [deleteMutationFn, selection]);

	return (
		<div className="flex gap-6 items-center h-8">
			<h3 className="text-ds-fg-2 font-medium">
				{`${selectedCount} user${selectedCount !== 1 ? "s" : ""} selected`}
			</h3>
			{selectedCount > 0 && (
				<div className="flex items-center gap-2">
					<Button
						variant="secondary"
						shadow="sm"
						size="sm"
						type="button"
						icon={EditIcon}
						disabled={isPending}
					>
						Edit
					</Button>
					<Button
						variant="secondary"
						shadow="sm"
						size="sm"
						type="button"
						icon={TrashIcon}
						disabled={isPending}
						onClick={deleteUsers}
					>
						Delete
					</Button>
				</div>
			)}
		</div>
	);
}
