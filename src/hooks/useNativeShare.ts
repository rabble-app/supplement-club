import { CustomToast, StatusToast } from "@/components/shared/Toast";
import { useFirst30Days } from "./useFirst30Days";

interface UseNativeShareProps {
  url: string;
}

/**
 * Custom hook for native sharing functionality
 * On mobile: Opens native share tray + copies link
 * On desktop: Only copies link
 * @param url - The URL to share
 * @returns Function to trigger native share
 */
export const useNativeShare = ({ url }: UseNativeShareProps) => {
  const isFirst30Days = useFirst30Days();

  const triggerNativeShare = async () => {
    // Check if it's a mobile device (screen width <= 768px or touch device)
    const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      CustomToast({
        title: "Copied link",
        status: StatusToast.SUCCESS,
        position: "top-center",
      });
    } catch (error) {
      console.log("Failed to copy link:", error);
    }
    // On mobile: Show native share tray if available
    if (isMobile && navigator.share) {
      const title = isFirst30Days
        ? "Get 6 months free membership at Supplement Club when you join using my referral link below"
        : "Get 10% credit at Supplement Club when you join using my referral link below";

      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        // If sharing was cancelled or failed, fall through to copy only
        console.log("Native sharing cancelled or failed:", error);
      }
    }
  };

  return { triggerNativeShare };
};
