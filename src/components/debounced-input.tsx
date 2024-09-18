import {
	type InputHTMLAttributes,
	type ReactNode,
	useEffect,
	useState,
} from "react";

export type DebouncedInputProps = {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
	icon?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	icon,
	...props
}: DebouncedInputProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, debounce, onChange]);

	return (
		<label
			htmlFor="search"
			className="flex px-3 py-2 bg-white items-center gap-2 h-[40px] border border-ds-border focus-within:border-ds-primary rounded"
		>
			{icon}
			<input
				className="bg-transparent text-sm font-sans border-none outline-none placeholder:font-sans"
				name="search"
				{...props}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</label>
	);
}
