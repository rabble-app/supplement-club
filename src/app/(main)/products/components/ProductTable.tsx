import { Separator } from "@radix-ui/react-select";

import type IProductTableModel from "@/utils/models/IProductTableModel";
const productTableHeader = [
	{ key: "colum1", label: "Product" },
	{ key: "colum2", label: "Kaneka Ubiquinol" },
	{ key: "colum3", label: "Leading Brands" },
	{ key: "colum4", label: "Ubiquinone" },
];

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
		colum4: "High, designed for rapid absorption",
	},
	{
		colum1: "Absorption Rate",
		colum2: "Fast, active form",
		colum3: "Moderate (BioPerine enhances absorption)",
		colum4: "High, designed for rapid absorption",
	},
	{
		colum1: "Dosage per Serving",
		colum2: "100mg Ubiquinol",
		colum3: "100mg Ubiquinone",
		colum4: "100mg Ubiquinone",
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
		colum3: "General energy, antioxidant support",
		colum4: "General energy, antioxidant support",
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

export default function ProductTable() {
	const renderCell = (
		content: string,
		isHeader: boolean,
		isFirstHighlighted: boolean,
		isLastHighlighted: boolean,
		isHighlighted?: boolean,
	) => (
		<p
			className={`font-roboto ${isHeader ? "text-blue font-bold" : "text-blue"} 
		  ${isHighlighted ? "text-white bg-blue my-[-11px]" : ""} 
		  ${isFirstHighlighted ? " rounded-t-[6px]" : ""} 
		  ${isLastHighlighted ? " rounded-b-[6px]" : ""} 
		  text-[12px] leading-[12px] px-[10px] flex items-center justify-center text-center break-words`}
		>
			{content}
		</p>
	);

	return (
		<div className="grid">
			{/* Render Header */}
			<div className="grid grid-cols-[1fr_100px_60px_60px] md:grid-cols-[1fr_140px_140px_140px] p-[10px] h-[50px] border-[1px] border-transparent">
				{productTableHeader.map((header, index) =>
					renderCell(header.label, true, index === 1, false, index === 1),
				)}
			</div>

			{/* Render Table Rows */}
			<div className="border-[1px] border-blue rounded-[8px] overflow-hidden">
				{productTableItems.map((item, index) => (
					<div key={item.colum1}>
						<div
							className={`grid grid-cols-[1fr_100px_60px_60px] md:grid-cols-[1fr_140px_140px_140px] p-[10px] md:h-[50px] ${
								index === productTableItems.length - 1 ? "mb-[20px]" : ""
							}`}
						>
							{productTableHeader.map((header, i) =>
								renderCell(
									item[header.key as keyof IProductTableModel],
									false,
									false,
									index === productTableItems.length - 1,
									i === 1,
								),
							)}
						</div>
						<Separator className="bg-blue h-[1px]" />
					</div>
				))}
			</div>
		</div>
	);
}
