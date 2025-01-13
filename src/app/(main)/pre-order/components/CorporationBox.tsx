import ImageBox from "@/components/ImageBox";
import CorporationCardInfo from "@/components/cards/CorporationCardInfo";

export default function CorporationBox() {
	return (
		<div className="flex flex-col gap-[16px] md:gap-[24px]">
			<CorporationCardInfo />

			<div className="flex flex-col gap-[16px] font-helvetica">
				<p>
					Ubiquinol is the body-ready and active form of CoQ10 important for
					virtually every cell in the body. It powers cellular energy production
					and protects your cells from oxidative stress, making it vital for
					staying healthy, energetic, and vibrant as you age.
					<br />
					<br />
					Kaneka Corporation are the leading manufacturer based in Japan.
				</p>
				<ImageBox />
			</div>
		</div>
	);
}
