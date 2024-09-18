import { useMutation } from "@tanstack/react-query";
import { deleteUsers } from "./delete-users";
import { queryClient } from "../../../config/query-client";
import type { GetUsersResponse } from "./get-users";

export function useDeleteUsers() {
	return useMutation({
		mutationFn: async ({ userIds }: { userIds: string[] }) =>
			await deleteUsers(userIds),
		onSuccess: (data) => {
			queryClient.setQueryData<GetUsersResponse>(["users"], (old) => {
				if (!old) return undefined;

				return data;
			});
		},
	});
}
