import Image from "next/image";

interface MembershipBoxProps {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export default function MembershipBox({
	src,
	alt,
	width,
	height,
}: MembershipBoxProps) {
	return (
		<div className="relative bg-blue inner-border-box min-h-[197px]">
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	);
}
