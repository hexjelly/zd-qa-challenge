import { useGetUsers } from "./api/use-get-users";

export function UserList() {
	const { data } = useGetUsers();
	return (
		<ul>
			{data?.users.map((user) => {
				return <li key={user.id}>{user.name}</li>;
			})}
		</ul>
	);
}
