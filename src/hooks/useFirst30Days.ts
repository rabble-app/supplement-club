import { useUser } from "@/contexts/UserContext";
import { differenceInDays } from "date-fns";

/**
 * Custom hook to determine if a user is within their first 30 days of membership
 * @returns boolean - true if user is within first 30 days, false otherwise
 */
export const useFirst30Days = (): boolean => {
  const context = useUser();
  console.log('firstPaymentDate',context?.user?.firstPaymentDate);

  if (!context?.user?.firstPaymentDate) {
    return true;
  }

  const firstPaymentDate = new Date(context.user.firstPaymentDate);
  const today = new Date();
  const daysSinceFirstPayment = differenceInDays(today, firstPaymentDate);

  return daysSinceFirstPayment <= 30;
};
