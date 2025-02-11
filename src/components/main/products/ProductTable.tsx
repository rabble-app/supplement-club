import { Separator } from "@radix-ui/react-select";

import type IProductTableModel from "@/utils/models/IProductTableModel";

const productTableIHeader = {
	colum1: "Product",
	colum2: "Kaneka Ubiquinol",
	colum3: "Leading Brands",
	colum4: "Ubiquinone",
} as IProductTableModel;

const UBIQUINONE = "100mg Ubiquinone";
const GENERAL_BENEFITS = "General energy, antioxidant support";
const HIGH_ABSORPTION = "High, designed for rapid absorption";

const productTableItems = [
	{
		colum1: "Form",
		colum2: "Ubiquinol (active form)",
		colum3: "Ubiquinol (inactive form)",
		colum4: "Ubiquinol (inactive form)",
	},
	{
		colum1: "Delivery Form",
		colum2: "Liposomal Uniquinol",
		colum3: "Capsule (with BioPerime for absorption)",
		colum4: "Liquid softgel",
	},
	{
		colum1: "Bioavailability",
		colum2: "3-8x higher",
		colum3: "Moderate (boosted by BioPerine)",
		colum4: HIGH_ABSORPTION,
	},
	{
		colum1: "Absorption Rate",
		colum2: "Fast, active form",
		colum3: "Moderate (BioPerine enhances absorption)",
		colum4: HIGH_ABSORPTION,
	},
	{
		colum1: "Dosage per Serving",
		colum2: "100mg Ubiquinol",
		colum3: UBIQUINONE,
		colum4: UBIQUINONE,
	},
	{
		colum1: "Clinical Backing",
		colum2: "Backed by over 30 clinical trials",
		colum3: "Moderate studies, BioPerine boosts claims",
		colum4: "Moderate studies supporting liquid absorption",
	},
	{
		colum1: "Targeted Benefits",
		colum2: "Energy, heart health, recovery",
		colum3: GENERAL_BENEFITS,
		colum4: GENERAL_BENEFITS,
	},
	{
		colum1: "Price per Serving",
		colum2: "1.50 per 100mg",
		colum3: "0.75 per 100mg (with BioPerine)",
		colum4: "1.10 per 100mg",
	},
	{
		colum1: "Convenience",
		colum2: "1 capsule a day, no refrigeration",
		colum3: "1 capsule a day, BioPerine included",
		colum4: "1 softgel a day",
	},
	{
		colum1: "Additives",
		colum2: "None",
		colum3: "Contains BioPerine for absorption",
		colum4: "None",
	},
	{
		colum1: "Packaging & Shelf Life",
		colum2: "Duo cap, 2-year shelf life",
		colum3: "Standard capsule, 2-year shelf life",
		colum4: "Softgel, 2-year shelf life",
	},
	{
		colum1: "Third-Party Certifications",
		colum2: "NFS Certified",
		colum3: "Some brands third-party tested",
		colum4: "NFS Certified",
	},
] as IProductTableModel[];

export default function ProfuctTable() {
	return (
		<div className="grid">
			<div className="grid grid-cols-[1fr_100px_60px_60px] md:grid-cols-[1fr_140px_140px_140px] p-[10px] h-[50px] border-[1px] border-transparent">
				<p className="font-roboto text-blue text-[12px] leading-[12px] px-[10px] flex items-center text-center">
					{productTableIHeader.colum1}
				</p>
				<p className="font-roboto text-white bg-blue my-[-11px] text-[12px] leading-[12px] px-[10px] flex items-center justify-center text-center rounded-t-[6px]">
					{productTableIHeader.colum2}
				</p>
				<p className="font-roboto text-blue text-[12px] leading-[12px] px-[10px] flex items-center justify-center text-center">
					{productTableIHeader.colum3}
				</p>
				<p className="font-roboto text-blue text-[12px] leading-[12px] px-[10px] flex items-center justify-center text-center">
					{productTableIHeader.colum4}
				</p>
			</div>

			<div className="border-[1px] border-blue rounded-[8px] overflow-hidden">
				{productTableItems.map((item, index) => (
					<div key={`${item.colum1} ${index}`}>
						<div
							className={`grid grid-cols-[1fr_100px_60px_60px] md:grid-cols-[1fr_140px_140px_140px] p-[10px] md:h-[50px] ${index === productTableItems.length - 1 ? "mb-[20px]" : ""}`}
						>
							<p className="font-bold font-inconsolata text-blue text-[12px] leading-[12px] flex items-center break-words">
								{item.colum1}
							</p>
							<p
								className={`font-roboto text-white bg-blue my-[-11px] text-[12px] leading-[12px] px-[10px] break-words flex items-center justify-center text-center ${index === productTableItems.length - 1 ? "rounded-b-[6px] mb-[-20px] pb-[20px]" : ""}`}
							>
								{item.colum2}
							</p>
							<p className="font-roboto text-blue text-[12px] leading-[12px] px-[10px] flex items-center justify-center text-center break-words">
								{item.colum3}
							</p>
							<p className="font-roboto text-blue text-[12px] leading-[12px] px-[10px] flex items-center justify-center text-center break-words">
								{item.colum4}
							</p>
						</div>

						<Separator className="bg-blue h-[1px]" />
					</div>
				))}
			</div>
		</div>
	);
}
