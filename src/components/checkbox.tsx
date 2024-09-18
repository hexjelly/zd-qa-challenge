import { type HTMLProps, useEffect, useRef } from "react";

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

	return <input checked={checked} type="checkbox" ref={ref} {...rest} />;
}
