import type { IPastOrderModel } from "@/utils/models/IPastOrderModel";

export default function PastOrderCard(model: Readonly<IPastOrderModel>) {
	return <div className="py-[16px]">{model.id}</div>;
}
