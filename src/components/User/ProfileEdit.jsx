import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { DeviceFrameset } from "react-device-frameset";

function ProfileEdit() {
  const [name, setName] = useState("나지민");
  const [username, setUsername] = useState("jimin2570");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("밝히고 싶지 않음");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <MainContainer>
      <Container>
        <DeviceFrameset device="iPad Mini">
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
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputLabel>소개</InputLabel>
            <TextArea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="한줄 소개를 해보세요"
            />

            <InputLabel>성별</InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="밝히고 싶지 않음">밝히고 싶지 않음</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </Select>
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
  overflow: hidden; /* DeviceFrameset이 영역을 벗어나지 않도록 제한 */
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 1.8rem; /* 더 크게 보이도록 설정 */
  cursor: pointer;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin: 20px 0;
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
`;

const AvatarButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #1e90ff;
  cursor: pointer;
`;

const Form = styled.div`
  margin-top: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: black;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #1c1c1c;
  color: #fff;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #1c1c1c;
  color: #fff;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #1c1c1c;
  color: #fff;
`;
