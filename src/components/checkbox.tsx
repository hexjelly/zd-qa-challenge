import { type HTMLProps, useEffect, useRef } from "react";
import CheckIcon from "../icons/check.svg?react";
import IndeterminateIcon from "../icons/indeterminate.svg?react";
import { twMerge } from "tailwind-merge";

export type CheckboxProps = {
	indeterminate?: boolean;
} & HTMLProps<HTMLInputElement>;

export function Checkbox({ indeterminate, checked, ...rest }: CheckboxProps) {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (typeof indeterminate === "boolean" && ref.current) {
			ref.current.indeterminate = !checked && indeterminate;
		}
	}, [indeterminate, checked]);

	return (
		// biome-ignore lint: too annoying atm
		<label
			className={twMerge([
				"w-4 h-4 bg-white rounded text-white flex items-center justify-center border border-ds-border",
				checked && "bg-ds-primary",
				indeterminate && "bg-ds-primary",
			])}
			onClick={(e) => e.stopPropagation()}
		>
			{indeterminate && (
				<IndeterminateIcon
					aria-hidden
					className="pointer-events-none w-full h-full m-0.5"
				/>
			)}
			{checked && !indeterminate && (
				<CheckIcon aria-hidden className="pointer-events-none w-full h-full" />
			)}
			<input
				className="appearance-none"
				checked={checked}
				type="checkbox"
				ref={ref}
				{...rest}
			/>
		</label>
	);
}
