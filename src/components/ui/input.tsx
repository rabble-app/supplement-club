import * as React from "react";

import { cn } from "@/utils/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-[48px] w-full border-black border-[1px] outline-none bg-white px-3 py-[10px] focus-visible:outline-none rounded-[0]",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
