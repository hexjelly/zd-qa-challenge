import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "./delete-user";
import { queryClient } from "../../../config/query-client";
import type { GetUsersResponse } from "./get-users";

export function useDeleteUser() {
	return useMutation({
		mutationFn: async ({ userId }: { userId: string }) =>
			await deleteUser(userId),
		onSuccess: (data) => {
			queryClient.setQueryData<GetUsersResponse>(["users"], (old) => {
				if (!old) return undefined;

				const newUsersData = [...old.users];
				const oldUserIndex = newUsersData.findIndex(
					(oldUser) => data.id === oldUser.id,
				);

				if (oldUserIndex >= 0) {
					newUsersData.splice(oldUserIndex, 1);
				}

				return { users: newUsersData };
			});
		},
	});
}
