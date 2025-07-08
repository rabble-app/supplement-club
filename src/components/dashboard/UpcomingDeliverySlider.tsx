"use client";

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import type { IUpcomingDeliveryResponse } from "@/utils/models/api/response/IUpcomingDeliveryResponse";
import UpcomingDeliveryCard from "./UpcomingDeliveryCard";

export default function UpcomingDeliverySlider({
	deliveries,
}: Readonly<{ deliveries: IUpcomingDeliveryResponse[] }>) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ 
		loop: true,
		align: 'start'
	});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
	const [isPaused, setIsPaused] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index: number) => emblaApi && emblaApi.scrollTo(index),
		[emblaApi]
	);

	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);

	// Mobile detection
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);

		return () => {
			emblaApi.off('select', onSelect);
			emblaApi.off('reInit', onSelect);
		};
	}, [emblaApi, onSelect]);

	// Auto-play functionality (disabled on mobile)
	useEffect(() => {
		if (deliveries.length <= 1 || isPaused || isMobile) return;

		const interval = setInterval(() => {
			scrollNext();
		}, 4000); // Change slide every 4 seconds

		return () => clearInterval(interval);
	}, [deliveries.length, isPaused, isMobile, scrollNext]);

	if (deliveries.length === 0) return null;

	return (
		<div 
			className="relative"
			onMouseEnter={() => !isMobile && setIsPaused(true)}
			onMouseLeave={() => !isMobile && setIsPaused(false)}
		>
			{/* Carousel Container */}
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{deliveries.map((delivery, index) => (
						<div key={`${delivery.deliveryDate}-${index}`} className="flex-[0_0_100%] min-w-0">
							<div className="p-1 bg-blue rounded-[12px]">
								<UpcomingDeliveryCard model={delivery} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Dots Indicator */}
			{deliveries.length > 1 && (
				<div className="flex justify-center mt-4 gap-2">
					{scrollSnaps.map((_, index) => (
						<button
							key={index}
							onClick={() => scrollTo(index)}
							className={`w-2 h-2 rounded-full transition-all duration-200 ${
								index === selectedIndex
									? 'bg-[#00038F] w-6'
									: 'bg-gray-300 hover:bg-gray-400'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}

			{/* Slide Counter */}
			{deliveries.length > 1 && (
				<div className="text-center mt-2 text-sm text-gray-500 font-medium">
					{selectedIndex + 1} of {deliveries.length}
				</div>
			)}
		</div>
	);
} 