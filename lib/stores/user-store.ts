import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserInfo } from '@/types/auth';

type UserState = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // Tên key trong localStorage
      storage: createJSONStorage(() => localStorage), // Chỉ định localStorage
    }
  )
);

// Optional: Một hook để kiểm tra xem người dùng có được xác thực không
export const useIsAuthenticated = () => {
    const user = useUserStore((state) => state.user);
    return user !== null;
}; 