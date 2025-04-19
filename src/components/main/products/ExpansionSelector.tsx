import { Checkbox } from "@/components/ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type ExpansionSelectorProps = {
	title: string;
	updateItems: (items: string[]) => void;
	items: string[];
	defaultSelection?: string;
};

export default function ExpansionSelector({
	title,
	updateItems,
	items,
	defaultSelection,
}: Readonly<ExpansionSelectorProps>) {
	// State to manage selected items
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	// Handle category selection and updates
	const handleChange = useCallback(
		(item: string) => {
			setSelectedItems((prevSelected) => {
				const isSelected = prevSelected.some(
					(i) => i.toLowerCase() === item.toLowerCase(),
				);
				const updatedItems = isSelected
					? prevSelected.filter(
							(value) => value.toLowerCase() !== item.toLowerCase(),
						)
					: [...prevSelected, item];

				setTimeout(() => {
					updateItems(updatedItems);
				}, 0);
				return updatedItems;
			});
		},
		[updateItems],
	);

	useEffect(() => {
		if (defaultSelection) {
			setSelectedItems([defaultSelection]);
		} else {
			setSelectedItems([]);
		}
	}, [defaultSelection]);

	const triggerClasses =
		"text-[16px] leading-[18px] font-[700] font-helvetica gap-x-[16px] flex justify-between items-center w-full pb-[16px] [&[data-state=open]>svg]:rotate-180";
	const chevronClasses =
		"h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200";

	return (
		<Collapsible defaultOpen={selectedItems.length > 0}>
			{/* Trigger to expand/collapse the content */}
			<CollapsibleTrigger className={triggerClasses}>
				<p className="font-bold">{title}</p>
				<ChevronDown className={chevronClasses} />
			</CollapsibleTrigger>

			<CollapsibleContent className="grid gap-[16px]">
				{items.map((item, idx) => (
					<div
						key={`${item} ${idx + 1}`}
						className="flex items-start gap-x-[10px]"
					>
						<Checkbox
							value={item}
							checked={selectedItems?.includes(item)}
							onClick={() => handleChange(item)}
						/>

						<button
							type="button"
							onClick={() => handleChange(item)}
							className="text-[16px] leading-[20px] font-[500] font-inter cursor-pointer text-left"
						>
							{item}
						</button>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
