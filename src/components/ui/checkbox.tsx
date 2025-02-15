"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/utils";

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"peer h-[20px] w-[20px] text-[16px] rounded-[4px] text-white border box-content focus-visible:outline-blue-500 focus-visible:ring-2 focus-visible:ring-blue-300",
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn(
				"flex items-center justify-center border-none rounded-[4px] bg-blue text-current h-[20px] w-[20px]",
			)}
		>
			<Check className="h-[20px] w-[20px] p-[2px]" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
