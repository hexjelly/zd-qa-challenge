import { API_URL } from "../../../config/app";
import type { User } from "../entities/user";

export type DeleteUsersResponse = { users: User[] };

export async function deleteUsers(userIds: string[]) {
	const res = await fetch(`${API_URL}/users`, {
		method: "POST",
		body: JSON.stringify(userIds),
	});
	const json = (await res.json()) as DeleteUsersResponse;
	return json;
}
