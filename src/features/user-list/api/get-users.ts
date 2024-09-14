import { API_URL } from "../../../config/app";
import type { User } from "../entities/user";

export type GetUsersResponse = {
	users: User[];
};

export async function getUsers() {
	const res = await fetch(`${API_URL}/users`);
	const json = (await res.json()) as GetUsersResponse;
	return json;
}
