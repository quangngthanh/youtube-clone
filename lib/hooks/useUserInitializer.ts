
import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/user-store";
import { UserInfo } from "@/types/auth";

export function useUserInitializer() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user_info") : null;
    if (userStr) {
      try {
        const user: UserInfo = JSON.parse(userStr);
        setUser(user);
      } catch {
        setUser(null);
      }
    }
  }, [setUser]);
}