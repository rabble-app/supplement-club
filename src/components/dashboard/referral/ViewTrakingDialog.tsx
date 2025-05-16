import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import { referalService } from "@/services/referalService";
import type IEarningHistoryModel from "@/utils/models/IEarningHistoryModel";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ViewTrakingCard from "./ViewTrakingCard";

export default function ViewTrakingDialog({
	open,
	openAction,
}: Readonly<{ open: boolean; openAction: (val: boolean) => void }>) {
	const [show, setShow] = useState(open);

	const [referalHistories, setReferalHistories] = useState<
		IEarningHistoryModel[]
	>([]);

	useEffect(() => {
		const fetchReferalRewars = async () => {
			const model = await referalService.getReferralHistories();
			setReferalHistories(model);
		};
		fetchReferalRewars();
	}, []);

	function hideDialog() {
		setShow(false);
		openAction(false);
	}
	useEffect(() => {
		setShow(open);
	}, [open]);
	return (
		<Dialog open={show} onOpenChange={hideDialog}>
			<DialogContent className="w-full top-[50%] md:max-w-[650px] p-[0] gap-[0] md:left-auto md:top-[0] right-[0] md:-translate-x-0 md:-translate-y-0 h-full flex flex-col">
				<DialogClose className="absolute left-[18px] top-[18px]" asChild>
					<div className="items-center gap-[8px] text-blue font-bold text-[16px] leading-[18px] font-helvetica flex justify-center">
						<ChevronLeft
							onClick={hideDialog}
							className="text-blue w-[20px] h-[20px]"
						/>{" "}
						Back
					</div>
				</DialogClose>

				<DialogTitle className="text-center text-[26px] leading-[39px] font-inconsolata font-bold min-h-[55px] border-y-[1px] border-grey30 justify-center flex items-center">
					View Tracking
				</DialogTitle>

				<div className="text-center flex flex-col gap-[16px] p-[16px] justify-start overflow-y-auto">
					{referalHistories.map((item, i) => (
						<ViewTrakingCard key={`view-${i + 1}`} model={item} />
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
