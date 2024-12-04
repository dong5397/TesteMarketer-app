import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { DeviceFrameset } from "react-device-frameset";

function ProfileEdit() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    // 프로필 초기 데이터 가져오기
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://maketerbackend.fly.dev/api/v1/getprofile",
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        if (data.resultCode === "S-1") {
          const { full_name, username, email, phone_number } = data.data;
          setName(full_name || "");
          setUsername(username || "");
          setEmail(email || "");
          setPhoneNumber(phone_number || "");
        } else {
          console.error("Failed to fetch profile:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const requestBody = {
        full_name: name,
        email,
        phone_number: phoneNumber,
      };

      console.log("Updating profile with data:", requestBody); // 요청 데이터 로그

      const response = await fetch(
        "https://maketerbackend.fly.dev/api/v1/updateprofile",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response status:", response.status); // 응답 상태 로그

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      if (data.resultCode === "S-1") {
        alert("프로필이 성공적으로 업데이트되었습니다!");
        navigate(-1); // 이전 페이지로 이동
      } else {
        console.error("Failed to update profile:", data.msg);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (loading) {
    // 로딩 중일 때 표시
    return (
      <MainContainer>
        <p>로딩 중...</p>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Container>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="90%"
          height="80%"
        >
          <BackButton onClick={handleGoBack}>
            <FaArrowLeft />
          </BackButton>

          <ProfileSection>
            <ProfileImages>
              <Avatar src="https://www.studiopeople.kr/common/img/default_profile.png" />
              <AvatarButton>사진 또는 아바타 수정</AvatarButton>
            </ProfileImages>
          </ProfileSection>

          <Form>
            <InputLabel>이름</InputLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputLabel>사용자 이름</InputLabel>
            <Input
              type="text"
              value={username}
              disabled
              style={{ backgroundColor: "#ddd", cursor: "not-allowed" }}
            />

            <InputLabel>이메일</InputLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputLabel>전화번호</InputLabel>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <SaveButton onClick={handleSave}>저장</SaveButton>
          </Form>
        </DeviceFrameset>
      </Container>
    </MainContainer>
  );
}

export default ProfileEdit;

const MainContainer = styled.div`
  background-color: #e7e78b;
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 10px;
    height: auto;
  }
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  color: #333;
  font-family: Arial, sans-serif;

  @media screen and (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 1.8rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProfileSection = styled.div`
  text-align: center;
  margin: 20px 0;

  @media screen and (max-width: 768px) {
    margin: 10px 0;
  }
`;

const ProfileImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ddd;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const AvatarButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #1e90ff;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Form = styled.div`
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 15px;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: black;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #333;
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #67ab49;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #4e8a37;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;
