import { useUser } from "@/contexts/UserContext";
import { differenceInDays } from "date-fns";

/**
 * Custom hook to determine if a user is within their first 30 days of membership
 * @returns [boolean, number] - [isWithinFirst30Days, daysRemaining]
 *   - isWithinFirst30Days: true if user is within first 30 days, false otherwise
 *   - daysRemaining: number of days remaining to reach 30 days (0 if 30+ days have passed)
 */
export const useFirst30Days = (): [boolean, number] => {
  const context = useUser();

  if (!context?.user?.firstPaymentDate) {
    return [true, 30];
  }

  const firstPaymentDate = new Date(context.user.firstPaymentDate);
  const today = new Date();
  const daysSinceFirstPayment = differenceInDays(today, firstPaymentDate);

  const daysToReturn = daysSinceFirstPayment < 30 ? 30 - daysSinceFirstPayment : 0;

  return [daysSinceFirstPayment <= 30, daysToReturn];
};
