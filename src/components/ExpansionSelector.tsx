import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import type { ICategoryModel } from "@/utils/models/ICategoryModel";

export default function ExpansionSelector({
	title,
	categories,
}: Readonly<{ title: string; categories: ICategoryModel[] }>) {
	const [selectedCategories, setSelectedCategories] = useState([] as number[]);

	const handleCategoryChange = (categoryId: number) => {
		setSelectedCategories((prevSelected) =>
			prevSelected.includes(categoryId)
				? prevSelected.filter((id) => id !== categoryId)
				: [...prevSelected, categoryId],
		);
	};

	return (
		<Collapsible defaultOpen={selectedCategories.length > 0}>
			<CollapsibleTrigger className="text-[16px] leading-[18px] font-[700] font-helvetica gap-x-[16px] flex justify-between items-center w-full pb-[16px] [&[data-state=open]>svg]:rotate-180">
				<p className="font-bold">{title}</p>
				<ChevronDown className="h-[22px] w-[22px] shrink-0 text-muted-foreground transition-transform duration-200" />
			</CollapsibleTrigger>
			<CollapsibleContent className="grid gap-[16px]">
				{categories.map((option: ICategoryModel) => (
					<div key={option.id} className="flex items-center gap-x-[10px]">
						<Checkbox
							value={option.label}
							checked={selectedCategories.includes(option.id)}
							onChange={() => handleCategoryChange(option.id)}
						/>

						<button
							type="button"
							onClick={() => handleCategoryChange(option.id)}
							className="text-[16px] leading-[20px] font-[500] font-inter cursor-pointer"
						>
							{option.label}
						</button>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
