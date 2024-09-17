import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "./delete-user";

export function useDeleteUser() {
	return useMutation({
		mutationFn: async ({ userId }: { userId: string }) =>
			await deleteUser(userId),
	});
}
