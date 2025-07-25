import { create } from "zustand";

interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  banned: boolean | null;
  banReason: string | null;
  banExpires: string | null;
  id: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {} as User,
    setUser: (user: User) => set({ user }),
}));