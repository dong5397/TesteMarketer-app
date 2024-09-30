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
  default: false, // 사용자가 로그인되었는지 여부
});
