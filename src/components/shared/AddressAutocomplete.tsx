/** @format */

"use client";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export interface AddressFormData {
  address: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  buildingNo?: string;
  building_number?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  userId?: string;
}


interface Props {
  form: UseFormReturn<AddressFormData>;
}

interface Suggestion {
  id: string;
  address: string;
}

export default function AddressAutocomplete({ form }: Props) {
  const addressValue = form.watch("address");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suppressNextFetch = useRef(false); // prevent fetch loop

  useEffect(() => {
    if (suppressNextFetch.current) {
      suppressNextFetch.current = false;
      return;
    }

    if (!addressValue || addressValue.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.getaddress.io/autocomplete/${encodeURIComponent(
            addressValue
          )}?api-key=${process.env.NEXT_PUBLIC_GETADDRESS_API_KEY}`
        );
        const data = await res.json();
        if (data?.suggestions) {
          setSuggestions(data.suggestions);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("Autocomplete error", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [addressValue]);

  const handleSelect = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.getaddress.io/get/${id}?api-key=${process.env.NEXT_PUBLIC_GETADDRESS_API_KEY}`
      );
      const data = await res.json();

      suppressNextFetch.current = true;

      form.setValue("address", data.line_1);
      form.setValue("address2", data.line_2);
      form.setValue("city", data.town_or_city);
      form.setValue("postalCode", data.postcode);
      form.setValue("country", "United Kingdom");

      setSuggestions([]);
      setShowSuggestions(false);
    } catch (err) {
      console.error("Fetch full address error", err);
    }
  };

  return (
    <div className="relative">
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-300 w-full mt-1 shadow-md rounded-md">
          {suggestions.map((sug) => {
            const parts = sug.address
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            const [line1, ...rest] = parts;

            return (
              <li
                key={sug.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm w-full"
                onClick={() => handleSelect(sug.id)}
              >
                <p className="text-sm font-semibold">{line1}</p>
                <span className="text-sm text-gray-600">
                  {rest.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < rest.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
