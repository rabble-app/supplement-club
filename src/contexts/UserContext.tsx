"use client";
import Cookies from "js-cookie";

import { type UserState, useUserStore } from "@/stores/userStore";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { type ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
	user: IUserResponse | null;
	setUser: (user: IUserResponse) => void;
	logout: () => void;
	setNewUser: (user: IUserResponse) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
	state: UserState;
}

export function UserProvider({ children, state }: Readonly<UserProviderProps>) {
	const storeState = useUserStore((store) => store);

	const [user, setUser] = useState<IUserResponse | null>(state?.user ?? null);
	const setNewUser = (user: IUserResponse) => {
		setUser(user);
	};

	const logout = () => {
		setUser(null);
		Cookies.remove("session");
	};

	const contextValue: UserContextType = {
		...storeState,
		user,
		setUser,
		logout,
		setNewUser,
	};

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		return undefined;
	}

	return context;
}
