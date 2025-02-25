import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/utils";

const Breadcrumb = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav"> & {
		separator?: React.ReactNode;
	}
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
	<ol
		ref={ref}
		className={cn(
			"flex flex-wrap items-center gap-[8px] break-words text-sm text-neutral-500 sm:gap-2.5 dark:text-neutral-400",
			className,
		)}
		{...props}
	/>
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li
		ref={ref}
		className={cn("inline-flex items-center gap-1.5", className)}
		{...props}
	/>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & {
		asChild?: boolean;
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			ref={ref}
			className={cn(
				" text-[14px] font-helvetica font-[400] text-black",
				className,
			)}
			{...props}
		/>
	);
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
	<button
		ref={ref}
		aria-disabled="true"
		className={cn(
			" text-[14px] font-helvetica font-bold text-black",
			className,
		)}
		{...props}
	/>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
	children,
	className,
	...props
}: React.ComponentProps<"div">) => (
	<div className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)} {...props}>
		{children ?? <ChevronRight />}
	</div>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
	className,
	...props
}: React.ComponentProps<"div">) => (
	<div
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
	</div>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
};
