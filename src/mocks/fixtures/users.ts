import type { User } from "../../features/user-list/entities/user";
import usersJson from "../fixtures/user-list.json";

export const users = usersJson.users as User[];
