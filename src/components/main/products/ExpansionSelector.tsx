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
	const [selectedItems, setSelectedItems] = useState<string[]>(
		defaultSelection ? [defaultSelection] : [],
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	// Update selected categories when defaultSelection changes
	useEffect(() => {
		setSelectedItems(defaultSelection ? [defaultSelection] : []);
		if (!isOpen) {
			setIsOpen(defaultSelection !== undefined);
		}
	}, [defaultSelection, isOpen]);

	const handleItemChange = useCallback(
		(category: string) => {
			setSelectedItems((prevSelected) => {
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

	const shouldShow = selectedItems.length > 0;

	return (
		<Collapsible key={shouldShow.toString()} defaultOpen={shouldShow || isOpen}>
			<CollapsibleTrigger className={triggerClasses}>
				<p className="font-bold">{title}</p>
				<ChevronDown className={chevronClasses} />
			</CollapsibleTrigger>

			<CollapsibleContent className="grid gap-[16px]">
				{items.map((item, idx) => (
					<div
						key={`${item}-${idx + 1}`}
						className="flex items-start gap-x-[10px]"
					>
						<Checkbox
							value={item}
							checked={selectedItems.includes(item)}
							onClick={() => handleItemChange(item)}
						/>

						<button
							type="button"
							onClick={() => handleItemChange(item)}
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
