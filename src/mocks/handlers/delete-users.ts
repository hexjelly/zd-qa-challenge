import { http, HttpResponse } from "msw";
import { users } from "../fixtures/users";
import { API_URL } from "../../config/app";

export const DELETE_USERS = http.post(
	`${API_URL}/users`,
	async ({ request }) => {
		const body = (await request.json()) as string[];
		const newUsers = users.users.filter(
			(user) => !body.includes(user.id.toString()),
		);
		users.users = newUsers;

		return HttpResponse.json(users);
	},
);
