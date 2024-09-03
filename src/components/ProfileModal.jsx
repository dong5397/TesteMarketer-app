// ProfileModal.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProfileModal = ({ show, onClose }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/profile", {
          method: "GET",
          headers: { token: localStorage.token },
        });

        const parseRes = await response.json();
        setProfile(parseRes.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
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
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Full Name: {profile.full_name}</p>
            <p>Phone Number: {profile.phone_number}</p>
            <p>Joined At: {profile.created_at}</p>
          </div>
        ) : (
          <p>Loading...</p>
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
