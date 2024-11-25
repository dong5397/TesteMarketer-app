import { atom } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const profileModalState = atom({
  key: "profileModalState",
  default: false,
});

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    isLoading: false,
    showAuthModal: false,
    userId: null,
    username: "",
    email: "",
  },
});
