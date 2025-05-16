import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { mapTagToValue } from "@/utils/helpers";
import Image from "next/image";

export default function ImageBox({ tags }: Readonly<{ tags?: string[] }>) {
	return (
		<div className="h-[56px] border-[1px] border-grey18 flex justify-center items-center gap-[16px]">
			{tags?.map((tag, idx) => {
				const image = mapTagToValue(tag);
				if (image) {
					return (
						<TooltipProvider key={`${tag} ${idx * 2}`}>
							<Tooltip>
								<TooltipTrigger>
									<Image
										src={image}
										alt={tag}
										width={32}
										height={32}
										priority
									/>
								</TooltipTrigger>
								<TooltipContent>{tag}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					);
				}
			})}
		</div>
	);
}
