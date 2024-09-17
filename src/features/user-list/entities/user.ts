export type Role = "ACCOUNT_MANAGER" | "ADMIN" | "AGENT" | "EXTERNAL_REVIEWER";

export type User = {
	avatar: string;
	email: string;
	id: number;
	name: string;
	role: Role;
};
