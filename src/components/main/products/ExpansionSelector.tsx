import { ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ExpansionSelectorProps = {
	title: string;
	updateItems: (items: string[]) => void;
	categories: string[];
};

export default function ExpansionSelector({
	title,
	updateItems,
	categories,
}: Readonly<ExpansionSelectorProps>) {
	// State to manage selected categories
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	// Handle category selection and updates
	const handleCategoryChange = useCallback(
		(category: string) => {
			setSelectedCategories((prevSelected) => {
				const isSelected = prevSelected.includes(category);
				const updatedCategories = isSelected
					? prevSelected.filter((value) => value !== category)
					: [...prevSelected, category];

				// Defer updateItems call to avoid state update during rendering
				setTimeout(() => {
					updateItems(updatedCategories);
				}, 0);
				return updatedCategories;
			});
		},
		[updateItems],
	);

	// CSS utility for consistent styling
	const triggerClasses =
		"text-[16px] leading-[18px] font-[700] font-helvetica gap-x-[16px] flex justify-between items-center w-full pb-[16px] [&[data-state=open]>svg]:rotate-180";
	const chevronClasses =
		"h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200";

	return (
		<Collapsible defaultOpen={selectedCategories.length > 0}>
			{/* Trigger to expand/collapse the content */}
			<CollapsibleTrigger className={triggerClasses}>
				<p className="font-bold">{title}</p>
				<ChevronDown className={chevronClasses} />
			</CollapsibleTrigger>

			{/* Collapsible content listing the categories */}
			<CollapsibleContent className="grid gap-[16px]">
				{categories.map((category, idx) => (
					<div
						key={`${category} ${idx + 1}`}
						className="flex items-start gap-x-[10px]"
					>
						{/* Checkbox for category selection */}
						<Checkbox
							value={category}
							checked={selectedCategories.includes(category)}
							onChange={() => handleCategoryChange(category)}
						/>

						{/* Label button for better accessibility */}
						<button
							type="button"
							onClick={() => handleCategoryChange(category)}
							className="text-[16px] leading-[20px] font-[500] font-inter cursor-pointer text-left"
						>
							{category}
						</button>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
