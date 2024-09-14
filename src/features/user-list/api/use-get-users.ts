import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./get-users";

export function useGetUsers() {
	return useQuery({ queryKey: ["users"], queryFn: getUsers });
}
