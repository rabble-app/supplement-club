"use client";

import { useUserStore } from "@/stores/userStore";
import type { IUserResponse } from "@/utils/models/api/response/IUserResponse";
import { type ReactNode, createContext, useContext, useMemo } from "react";

interface UserContextType {
	user: IUserResponse | null;
	setUser: (user: IUserResponse) => void;
	logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export function UserProvider({ children }: Readonly<UserProviderProps>) {
	const { setUser, user, logout } = useUserStore((state) => state);
	const obj = useMemo(
		() => ({ user, setUser, logout }),
		[user, setUser, logout],
	);
	return <UserContext.Provider value={obj}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextType {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}
