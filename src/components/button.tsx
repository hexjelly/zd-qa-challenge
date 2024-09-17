import type { ButtonHTMLAttributes, ComponentType, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
	size?: "md" | "sm";
	shadow?: "sm";
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export function Button({
	children,
	variant = "primary",
	shadow,
	size = "md",
	className,
	icon: Icon,
	...rest
}: ButtonProps) {
	return (
		<button
			className={twMerge([
				"text-white text-sm h-[40px] gap-2 font-medium rounded px-3 py-2 inline-flex justify-center items-center",
				variant === "primary" && "bg-ds-primary",
				variant === "secondary" &&
					"bg-white border border-ds-border text-ds-fg-3",
				shadow === "sm" && "shadow-sm",
				size === "sm" && "px-2 py-[5px] h-[32px]",
				className,
			])}
			{...rest}
		>
			{Icon && <Icon className="text-ds-subtle-2 w-[1.15em] h-[1.15em]" />}
			{children}
		</button>
	);
}
