import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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
	defaultSelection?: string;
};

export default function ExpansionSelector({
	title,
	updateItems,
	categories,
	defaultSelection,
}: Readonly<ExpansionSelectorProps>) {
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		defaultSelection ? [defaultSelection] : [],
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	// Update selected categories when defaultSelection changes
	useEffect(() => {
		setSelectedCategories(defaultSelection ? [defaultSelection] : []);
		if (!isOpen) {
			setIsOpen(defaultSelection !== undefined);
		}
	}, [defaultSelection, isOpen]);

	const handleCategoryChange = useCallback(
		(category: string) => {
			setSelectedCategories((prevSelected) => {
				const isSelected = prevSelected.includes(category);
				const updated = isSelected
					? prevSelected.filter((c) => c !== category)
					: [...prevSelected, category];

				setIsOpen(true);

				// Notify parent
				setTimeout(() => updateItems(updated), 0);
				return updated;
			});
		},
		[updateItems],
	);

	const triggerClasses =
		"text-[16px] leading-[18px] font-[700] font-helvetica gap-x-[16px] flex justify-between items-center w-full pb-[16px] [&[data-state=open]>svg]:rotate-180";
	const chevronClasses =
		"h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200";

	const shouldShow = selectedCategories.length > 0;

	return (
		<Collapsible key={shouldShow.toString()} defaultOpen={shouldShow || isOpen}>
			<CollapsibleTrigger className={triggerClasses}>
				<p className="font-bold">{title}</p>
				<ChevronDown className={chevronClasses} />
			</CollapsibleTrigger>

			<CollapsibleContent className="grid gap-[16px]">
				{categories.map((category, idx) => (
					<div
						key={`${category}-${idx + 1}`}
						className="flex items-start gap-x-[10px]"
					>
						<Checkbox
							value={category}
							checked={selectedCategories.includes(category)}
							onClick={() => handleCategoryChange(category)}
						/>

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
