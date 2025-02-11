"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

export interface AddressFormData {
	address: string; // Ensure this is a required string
	address2?: string;
	city: string;
	postalCode: string;
	country: string;
	buildingNo?: string;
	building_number?: string;
	firstName?: string;
	lastName?: string;
	mobileNumber?: string;
	// Add other fields as necessary
}

interface GetAddressEvent {
	address: {
		formatted_address: string[];
		building_number: string;
		sub_building_number: string;
		postalCode: string;
		country: string;
		town_or_city: string;
		line_2: string;
	};
}

interface GetAddress {
	autocomplete: (field: string, apiKey?: string) => Promise<unknown>;
}

interface Window {
	getAddress?: GetAddress;
}

interface AddressAutocompleteProps {
	form: UseFormReturn<AddressFormData>;
}

interface Autocomplete {
	addEventListener: (
		event: string,
		callback: (e: GetAddressEvent) => void,
	) => void;
	// Add other methods or properties as needed
}

export default function AddressAutocomplete({
	form,
}: Readonly<AddressAutocompleteProps>) {
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			if ((window as Window).getAddress) {
				setIsScriptLoaded(true);
				clearInterval(interval);
			} else {
				console.warn("getAddress not available, retrying...");
			}
		}, 500);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!isScriptLoaded) return;

		const enableAutocomplete = async () => {
			const getAddress = (window as Window).getAddress;
			if (!getAddress) {
				console.error("getAddress is still undefined.");
				return;
			}

			try {
				const autocomplete = (await getAddress.autocomplete(
					"address",
					process.env.NEXT_PUBLIC_GETADDRESS_API_KEY,
				)) as Autocomplete;

				autocomplete.addEventListener(
					"getaddress-autocomplete-selected",
					(e: GetAddressEvent) => {
						form.setValue("address", e.address.formatted_address[0]);
						form.setValue("address2", e.address.line_2);
						form.setValue(
							"buildingNo",
							e.address.building_number ?? e.address.sub_building_number,
						);
						form.setValue("city", e.address.town_or_city);
						form.setValue("country", e.address.country);
						form.setValue("postalCode", e.address.postalCode);
					},
				);
			} catch (error) {
				console.error("Error initializing getAddress:", error);
			}
		};

		enableAutocomplete();
	}, [isScriptLoaded, form]);

	return (
		<Script
			src="https://cdn.getaddress.io/scripts/getaddress-autocomplete-3.0.3.js"
			strategy="afterInteractive"
		/>
	);
}
