"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/utils/utils";

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-[8px] w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800",
			className,
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="h-full w-full flex-1 bg-[#00038F] transition-all dark:bg-neutral-50 rounded-[100px]"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
