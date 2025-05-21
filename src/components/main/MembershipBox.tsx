import Image from "next/image";

interface MembershipBoxProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	description: string;
}

export default function MembershipBox({
	src,
	alt,
	width,
	height,
	description,
}: MembershipBoxProps) {
	return (
		<div className="group relative bg-blue hover:bg-white inner-border-box min-h-[197px] cursor-pointer">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:hidden"
			/>
			<div className="hidden group-hover:block p-[32px] text-[12px] font-helvetica leading-[26px] text-blue">
				{description}
			</div>
		</div>
	);
}
