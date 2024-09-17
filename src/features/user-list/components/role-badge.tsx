import type { HTMLAttributes } from "react";
import type { Role } from "../entities/user";
import { twMerge } from "tailwind-merge";
import { formatRole } from "../helpers/format-role";

export type RoleBadgeProps = {
	role: Role;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children">;

export function RoleBadge({ role, className, ...rest }: RoleBadgeProps) {
	return (
		<span
			className={twMerge([
				"px-2 py-1 rounded font-medium text-xs self-center bg-gray-100",
				role === "ACCOUNT_MANAGER" && "text-ds-red-500 bg-ds-red-100",
				role === "EXTERNAL_REVIEWER" && "text-ds-yellow-500 bg-ds-yellow-100",
				role === "ADMIN" && "text-ds-purple-500 bg-ds-purple-100",
				role === "AGENT" && "text-ds-blue-500 bg-ds-blue-100",
				className,
			])}
			{...rest}
		>
			{formatRole(role)}
		</span>
	);
}
