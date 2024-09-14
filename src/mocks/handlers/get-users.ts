import { http, HttpResponse } from "msw";
import users from "../fixtures/users.json";
import { API_URL } from "../../config/app";

export const GET_USERS = http.get(`${API_URL}/users`, () => {
	return HttpResponse.json(users);
});
