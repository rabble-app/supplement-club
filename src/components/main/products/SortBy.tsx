import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function SortBy({
	updateItems,
	categories,
}: Readonly<{
	updateItems: (items: string) => void;
	categories: string[];
}>) {
	return (
		<div className="text-[16px] leading-[18px] font-[700] font-helvetica hidden md:flex gap-x-[16px] items-center pt-[25px]">
			Sort by
			<Select
				onValueChange={(value) => updateItems(value)}
				aria-label="Select a category"
			>
				<SelectTrigger className="w-[150px] border-none">
					<SelectValue placeholder="Most Popular" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					{categories.map((val) => (
						<SelectItem key={val} value={val}>
							{val}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
