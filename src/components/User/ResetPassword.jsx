import React, { useState } from "react";
import { toast } from "react-toastify"; // 알림 기능 필요 시 사용
import styled from "styled-components"; // styled-components 임포트

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 비밀번호 재설정 API 호출
      const response = await fetch(
        "https://maketerbackend.fly.dev/api/v1/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.resultCode === "S-1") {
        toast.success("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
        setEmail("");
      } else {
        toast.error(data.msg || "비밀번호 재설정에 실패했습니다.");
      }
    } catch (error) {
      toast.error("서버 오류 발생: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <PageContainer>
        <LeftSide>
          <TextContainer>
            <H1>Maketer</H1>
            <H2>대전 전체의 맛집을 찾아줍니다</H2>
            <Ul>
              <Li>우리집 주변 맛집은 뭐지?</Li>
              <Li>오늘 뭐먹지?</Li>
            </Ul>
          </TextContainer>
        </LeftSide>
        <RightSide>
          <ResetPasswordContainer>
            <h2>비밀번호 재설정</h2>
            <p>
              비밀번호를 재설정할 이메일을 입력해주세요. 입력된 메일로 자세한
              안내를 보내드립니다.
            </p>
            <Form onSubmit={handleSubmit}>
              <Label>비밀번호 재설정할 이메일*</Label>
              <Input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? "전송 중..." : "비밀번호 재설정 메일 보내기"}
              </Button>
            </Form>
          </ResetPasswordContainer>
        </RightSide>
      </PageContainer>
    </Background>
  );
}

export default ResetPassword;

const Background = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  min-height: 100vh;
  align-items: center;
  position: relative;
  display: flex;
  width: 100%;
  contain: paint;
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: auto 468px;
  width: 1200px;
  height: 100%;
  padding: 0 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const H1 = styled.h1`
  font-size: 60px;
  line-height: 1.2;
  font-family: "GowunDodum-Regular";
  color: #333;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const H2 = styled.h2`
  font-weight: 300;
  font-size: 30px;
  margin-bottom: 0.3rem;
  font-family: "GowunDodum-Regular";

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const LeftSide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin-bottom: 20px;
  }
`;

const RightSide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  max-width: 480px;
  background-color: white;
  border-radius: 10px;
  margin-left: 50px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 20px;
    color: #555;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #333;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#e7e78b")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#f0f0c3")};
    color: ${(props) => (props.disabled ? "white" : "#333")};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TextContainer = styled.div`
  margin-top: 6.75rem;
  font-size: 1.5625rem;
  font-weight: 700;
  position: relative;
  bottom: 150px;
  left: 200px;
  color: #fff;
  background-image: url("/images/resetpassword.png");
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Ul = styled.ul`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  padding: 1.2rem;
  list-style-type: none;
  margin-top: 20px;
`;

const Li = styled.li`
  font-size: 1.2rem;
  font-family: "GowunDodum-Regular";
  margin: 1.2rem 0;
  color: black;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
