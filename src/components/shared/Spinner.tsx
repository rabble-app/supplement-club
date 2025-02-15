export default function Spinner() {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-550px)]">
			<svg
				className="w-12 h-12 animate-spin"
				viewBox="0 0 50 50"
				aria-label="Loading..."
				role="img"
			>
				<circle
					className="stroke-current text-gray-300"
					cx="25"
					cy="25"
					r="20"
					fill="none"
					strokeWidth="3"
				/>
				<circle
					className="stroke-current text-blue"
					cx="25"
					cy="25"
					r="20"
					fill="none"
					strokeWidth="3"
					strokeDasharray="125"
					strokeDashoffset="100"
				/>
			</svg>
		</div>
	);
}
