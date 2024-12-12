import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import type { IFilterModel } from "@/utils/models/IFilterModel";

const sortBy = [
	{
		id: 1,
		value: "Highest",
	},
	{
		id: 2,
		value: "Lowest",
	},
	{
		id: 3,
		value: "Date",
	},
] as IFilterModel[];

export default function SortBy() {
	return (
		<div className="text-[16px] leading-[18px] font-[700] font-helvetica hidden md:flex gap-x-[16px] items-center pt-[25px]">
			Sort by
			<Select>
				<SelectTrigger className="w-[150px] border-none">
					<SelectValue placeholder="Most Popular" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					{sortBy.map((el) => (
						<SelectItem key={el.id} value={el.id.toString()}>
							{el.value}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
