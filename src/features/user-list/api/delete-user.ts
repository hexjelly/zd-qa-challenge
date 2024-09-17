import { API_URL } from "../../../config/app";
import type { User } from "../entities/user";

export type DeleteUserResponse = User;

export async function deleteUser(userId: string) {
	const res = await fetch(`${API_URL}/users/${userId}`, { method: "DELETE" });
	const json = (await res.json()) as DeleteUserResponse;
	return json;
}
