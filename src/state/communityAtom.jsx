// src/state/atoms.js
import { atom } from "recoil";

// 커뮤니티 게시물 상세 상태
export const postState = atom({
  key: "postState",
  default: null, // 선택된 게시물의 상세 정보를 저장
});

// 커뮤니티 댓글 상태
export const commentsState = atom({
  key: "commentsState",
  default: [], // 해당 게시물의 댓글 목록을 저장
});

// 새로운 댓글 입력 상태
export const newCommentState = atom({
  key: "newCommentState",
  default: "", // 새로운 댓글 입력 값을 저장
});

// 게시물 리스트 상태
export const postsState = atom({
  key: "postsState",
  default: [], // 커뮤니티 게시물 리스트를 저장
});

// 게시물 제목 상태 (글 작성/수정 페이지)
export const postTitleState = atom({
  key: "postTitleState",
  default: "", // 게시물 제목 입력 값을 저장
});

// 게시물 내용 상태 (글 작성/수정 페이지)
export const postContentState = atom({
  key: "postContentState",
  default: "", // 게시물 내용 입력 값을 저장
});

// 서버로부터 받은 메시지 상태 (글 작성/수정 후 메시지)
export const messageState = atom({
  key: "messageState",
  default: "", // 서버 응답 메시지를 저장
});

// 검색어 상태
export const searchQueryState = atom({
  key: "searchQueryState",
  default: "", // 검색어 입력 상태를 저장
});

// 검색 결과 상태
export const searchResultsState = atom({
  key: "searchResultsState",
  default: [], // 검색 결과 리스트를 저장
});

// 커뮤니티 메인 페이지 상태
export const communityPostsState = atom({
  key: "communityPostsState",
  default: [], // 커뮤니티 메인 페이지에서의 게시물 리스트를 저장
});

// 글쓰기 페이지 상태 (글쓰기 및 목록 보기 페이지 공용)
export const writePageState = atom({
  key: "writePageState",
  default: {
    title: "",
    content: "",
  }, // 글쓰기 상태를 저장 (제목과 내용)
});
export const postHashtagsState = atom({
  key: "postHashtagsState",
  default: [], // 해시태그 리스트를 저장
});
