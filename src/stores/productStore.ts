import type ISingleProductModel from "@/utils/models/ISingleProductModel";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductState {
	capsulesPerDay: number | null;
	product: ISingleProductModel | null;
	setCapsulesPerDay: (capsules: number | null) => void;
	setProduct: (product: ISingleProductModel | null) => void;
}

export const useProductStore = create(
	persist<ProductState>(
		(set) => ({
			capsulesPerDay: null,
			product: null,
			setCapsulesPerDay: (capsulesPerDay) => {
				set({ capsulesPerDay });
			},
			setProduct: (product) => {
				set({ product });
			},
		}),
		{
			name: "capsulesPerDay",
			storage: {
				getItem: (key) => {
					const cookie = Cookies.get(key);
					if (!cookie) return null;
					const result = JSON.parse(cookie).state;
					return result;
				},
				setItem: (key, value) => {
					const jsonString = JSON.stringify(value);

					// expires in 7 day
					const date = new Date();
					const days = 24 * 60 * 7;
					date.setTime(date.getTime() + days * 60 * 1000);
					Cookies.set(key, jsonString, { expires: date });
				},
				removeItem: (key) => {
					Cookies.remove(key);
				},
			},
		},
	),
);
