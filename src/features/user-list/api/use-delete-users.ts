import { useMutation } from "@tanstack/react-query";
import { deleteUsers } from "./delete-users";

export function useDeleteUsers() {
	return useMutation({
		mutationFn: async ({ userIds }: { userIds: string[] }) =>
			await deleteUsers(userIds),
	});
}
