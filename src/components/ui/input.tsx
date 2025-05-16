import { cn } from "@/utils/utils";
import React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, value, onChange, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-[48px] w-full border-black border-[1px] outline-none bg-white px-3 py-[10px] focus-visible:outline-none rounded-[0]",
					className,
				)}
				value={value ?? ""} // Ensure the value is always defined (fallback to empty string)
				onChange={onChange}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
