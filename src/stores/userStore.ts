import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
	user: IUserResponse | null;
	setUser: (user: IUserResponse | null) => void;
	logout: () => void;
}

export const useUserStore = create(
	persist<UserState>(
		(set) => ({
			user: null,
			setUser: (user) => {
				set({ user });
			},
			logout: () => {
				set({ user: null });
				Cookies.remove("session");
			},
		}),
		{
			name: "session",
			storage: {
				getItem: (key) => {
					const cookie = Cookies.get(key);
					if (!cookie) return null;
					const result = JSON.parse(cookie).state;
					return result;
				},
				setItem: (key, value) => {
					const jsonString = JSON.stringify(value);

					// expires in 30 min
					const date = new Date();
					const minutes = 30;
					date.setTime(date.getTime() + minutes * 60 * 1000);
					Cookies.set(key, jsonString, { expires: date });
				},
				removeItem: (key) => {
					Cookies.remove(key);
				},
			},
		},
	),
);
