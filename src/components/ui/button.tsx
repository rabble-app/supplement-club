import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/utils";

const buttonVariants = cva(
	"text-[16px] leading-[24px] font-roboto inline-flex items-center justify-center outline-none",
	{
		variants: {
			variant: {
				default: "bg-primary text-white",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				link: "text-white",
			},
			size: {
				default: "h-[48px] px-[24px]",
			},
			font: {
				default: "font-[400]",
				bold: "font-bold",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			font: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
