import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type React from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FormFieldComponentProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label?: string;
	placeholder: string;
	id?: string;
	type?: string;
	labelContent?: React.ReactNode;
	readonly?: boolean;
};

export default function FormFieldComponent<T extends FieldValues>({
	form,
	name,
	label,
	placeholder,
	id,
	type,
	labelContent,
	readonly,
}: Readonly<FormFieldComponentProps<T>>) {
	return (
		<FormField
			control={form.control}
			name={name}
			disabled={readonly}
			render={({ field, fieldState }) => (
				<FormItem className={fieldState.invalid ? "error" : ""}>
					<FormLabel className="flex justify-between text-[16px] font-bold font-inconsolata">
						{labelContent ?? label}
					</FormLabel>
					<FormControl>
						<Input
							{...field}
							placeholder={placeholder}
							id={id}
							type={type ?? "string"}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
