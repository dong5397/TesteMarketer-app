// ProfileModal.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingBurger from "../LoadingBurger";

const ProfileModal = ({ show, onClose }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://maketerbackend.fly.dev/api/v1/profile",
          {
            method: "GET",
            credentials: "include", // 세션 쿠키를 포함
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            console.error("세션이 만료되었거나 유효하지 않습니다.");
            // 추가적으로 로그아웃 처리나 에러 표시
          } else {
            throw new Error("프로필을 불러오는 중 에러 발생");
          }
        }

        const parseRes = await response.json();
        setProfile(parseRes.data);
      } catch (err) {
        console.error("프로필을 불러오는 중 에러 발생:", err);
      }
    };

    if (show) {
      fetchProfile();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>프로필</h2>
        {profile ? (
          <div>
            <ProfileCard src={profile.avatar_url} alt="Profile Avatar" />
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Full Name: {profile.full_name}</p>
            <p>Phone Number: {profile.phone_number}</p>
            <p>Joined At: {profile.created_at}</p>
          </div>
        ) : (
          <LoadingBurger />
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProfileModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  z-index: 1001;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
`;

const ProfileCard = styled.div`
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-top: 20px;
  margin: 0 auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
