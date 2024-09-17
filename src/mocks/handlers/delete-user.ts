import { http, HttpResponse } from "msw";
import { users } from "../fixtures/users";
import { API_URL } from "../../config/app";

export const DELETE_USER = http.delete(`${API_URL}/users/:id`, ({ params }) => {
	const userIndex = users.findIndex((user) => user.id.toString() === params.id);

	if (userIndex < 0) {
		return HttpResponse.json({ error: "Cannot find user" }, { status: 404 });
	}

	const user = users.splice(userIndex, 1);

	return HttpResponse.json(user[0]);
});
