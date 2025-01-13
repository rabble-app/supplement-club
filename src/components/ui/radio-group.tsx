"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/utils";

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Root
			className={cn("grid gap-2", className)}
			{...props}
			ref={ref}
		/>
	);
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"aspect-square h-[20px] w-[20px] rounded-full [&[data-state=checked]]:border-blue [&[data-state=checked]]:bg-blue9 border-[1px] text-neutral-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:text-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<Circle className="h-[10px] w-[10px] fill-current text-blue" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
