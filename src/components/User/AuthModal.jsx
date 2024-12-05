import React, { useState } from "react";
import styled from "styled-components";
import LoadingBurger from "../LoadingBurger"; // 경로에 맞춰서 import

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faEnvelope,
  faIdCard,
  faPhone,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons"; // 아이콘 임포트
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../state/userAtoms";

function AuthModal({ show, onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [auth, setAuth] = useRecoilState(authState);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    full_name: "",
    phone_number: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태 관리
  const [errors, setErrors] = useState({}); // 유효성 검사 에러 상태

  /* 인증 코드 관련 상태 */
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증코드 전송 여부
  const [verificationCode, setVerificationCode] = useState(""); // 입력된 인증코드
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
  const [generatedCode, setGeneratedCode] = useState(""); // 서버에서 받은 인증코드
  /* end 인증 코드 관련 상태 */

  // 유효성 검사 함수
  const validate = (name, value) => {
    let error = "";

    if (name === "username") {
      if (!idLength(value)) {
        error = "아이디는 4글자 이상, 12글자 이하로 입력해주세요.";
      } else if (!onlyNumberAndEnglish(value)) {
        error = "아이디는 영어 또는 숫자만 입력 가능합니다.";
      }
    } else if (name === "password") {
      if (!strongPassword(value)) {
        error = "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.";
      }
    } else if (name === "confirmPassword") {
      if (!isMatch(value, registerData.password)) {
        error = "비밀번호가 일치하지 않습니다.";
      }
    } else if (name === "phone_number") {
      if (!value) {
        error = "전화번호를 입력해주세요.";
      } else if (value.length < 10) {
        error = "전화번호 형식이 올바르지 않습니다.";
      }
    }

    return error;
  };

  // 입력값 변경 핸들러 (실시간 유효성 검사 포함)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isLogin) {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }

    // 실시간으로 유효성 검사 수행
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 비밀번호 표시 여부 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 전화번호 입력창 전화번호 형식변환 함수
  const onInputPhone = (e) => {
    const { value } = e.target;
    e.target.value = value
      .replace(/[^0-9]/g, "") // 숫자 이외의 문자 제거
      .replace(
        /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
        "$1-$2-$3"
      ); // 전화번호 형식 변환
  };

  /* 전화번호 인증 코드 전송 */
  const sendVerificationCode = async () => {
    // 전화번호에서 하이픈 제거
    const cleanedPhoneNumber = registerData.phone_number.replace(/-/g, "");

    if (cleanedPhoneNumber.length < 10) {
      setErrors((prev) => ({
        ...prev,
        phone_number: "올바른 전화번호를 입력해주세요.",
      }));
      return;
    }

    try {
      const response = await fetch(
        "https://maketerbackend.fly.dev/api/v1/send-verification-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone_number: cleanedPhoneNumber }),
        }
      );

      const parseRes = await response.json();
      if (parseRes.resultCode === "S-1") {
        setGeneratedCode(parseRes.verificationCode);
        console.log("Generated code from server:", parseRes.verificationCode); // 인증코드 확인
        setIsCodeSent(true); // 인증코드 전송 상태 업데이트
        toast.success("인증코드가 발송되었습니다.");
      } else {
        setIsCodeSent(false); // 요청 실패 시 다시 활성화
        toast.error("인증코드 발송 실패.");
      }
    } catch (error) {
      setIsCodeSent(false); // 에러 시 다시 버튼을 활성화
      toast.error("서버 오류 발생: " + error.message);
    }
  };

  // 인증코드 확인
  const verifyCode = async () => {
    if (!verificationCode) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "인증코드를 입력해주세요.",
      }));
      return;
    }

    try {
      console.log("Generated code:", generatedCode); // 서버에서 받은 인증코드 확인
      console.log("User input code:", verificationCode); // 사용자가 입력한 인증코드 확인

      const response = await fetch(
        "https://maketerbackend.fly.dev/api/v1/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationCode: generatedCode,
            inputCode: verificationCode,
          }),
        }
      );

      const parseRes = await response.json();
      if (parseRes.resultCode === "S-1") {
        setIsVerified(true); // 인증 성공 상태 업데이트
        toast.success(parseRes.msg);
      } else {
        toast.error(parseRes.msg);
      }
    } catch (error) {
      toast.error("서버 오류 발생: " + error.message);
    }
  };
  /* end 전화번호 인증 코드 전송 */

  /* 유효성 검증 함수 */
  const idLength = (value) => value.length >= 4 && value.length <= 12; // id : 글자 수 제한 (4글자이상 ~ 12글자 이하)
  const onlyNumberAndEnglish = (str) => /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str); // id : 영어 또는 숫자만 가능
  const strongPassword = (str) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str); // 비밀번호 : 8글자 이상, 영문, 숫자, 특수문자 사용
  const isMatch = (password1, password2) => password1 === password2; // 비밀번호 확인: 비밀번호와 비밀번호 확인 일치

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit executed"); // 로그인 버튼 클릭 시 이 로그가 찍히는지 확인
    console.log("isLogin:", isLogin); // 로그인 상태 확인
    console.log("Login Data:", loginData); // 로그인 데이터 확인

    // 인증 여부 확인
    if (!isLogin && !isVerified) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "전화번호 인증을 완료해주세요.",
      }));
      return;
    }

    // 전화번호에서 하이픈 제거
    const cleanedPhoneNumber = registerData.phone_number.replace(/-/g, "");

    // 최종 유효성 검사
    const newErrors = {};
    if (!isLogin) {
      for (const [name, value] of Object.entries(registerData)) {
        const error = validate(name, value);
        if (error) {
          newErrors[name] = error;
        }
      }

      if (Object.keys(newErrors).length > 0) {
        console.log("Validation errors:", newErrors);

        setErrors(newErrors);
        const firstErrorField = Object.keys(newErrors)[0];
        document.getElementsByName(firstErrorField)[0].focus();
        return;
      }
    }

    console.log("Register Data:", registerData);
    console.log("Sending login request:", loginData);

    // 유효성 검사가 통과하면 로딩 시작
    setLoading(true);

    const endpoint = isLogin
      ? "https://maketerbackend.fly.dev/api/v1/login"
      : "https://maketerbackend.fly.dev/api/v1/register";

    const data = isLogin
      ? loginData
      : {
          ...registerData,
          phone_number: cleanedPhoneNumber, // 하이픈 제거된 전화번호로 서버에 전송
        };

    console.log("API Endpoint:", endpoint); // API 엔드포인트 확인
    console.log("Request Payload:", data); // 전송될 데이터 확인

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // 세션 쿠키 포함
      });

      const parseRes = await response.json();
      setLoading(false);

      if (parseRes.resultCode === "S-1") {
        if (isLogin) {
          setAuth({
            isAuthenticated: true,
            userId: parseRes.data.userId, // 서버에서 받은 userId 저장
            username: parseRes.data.username,
            email: parseRes.data.email,
            full_name: data.fullName,
          });
          toast.success("로그인 성공!");

          onClose();
        }
      } else if (parseRes.resultCode === "S-1" && !isLogin) {
        toast.success("회원가입 성공!");
        setIsLogin(true); // 회원가입 후 로그인 모드로 전환
      } else {
        toast.error(isLogin ? "로그인 실패!" : "회원가입 실패!");
      }
    } catch (err) {
      toast.error("서버 오류 발생: " + err.message);
    }
  };

  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="sm"
            style={{ color: "#0f0f0f" }}
          />{" "}
        </CloseButton>
        <ModalHeader>
          <Title>Makter</Title>
        </ModalHeader>

        {loading ? (
          <LoadingBurger />
        ) : (
          <form onSubmit={handleSubmit}>
            {/* 로그인 필드 */}
            <InputWrapper>
              <FontAwesomeIcon icon={faIdCard} />
              <input
                type="text"
                name="username"
                placeholder="아이디를 입력해주세요"
                value={isLogin ? loginData.username : registerData.username}
                onChange={handleChange}
                required
                autoComplete="username" // 자동 완성 속성 추가
              />
              {errors.username && (
                <ErrorMessage>{errors.username}</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <FontAwesomeIcon icon={faLock} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={isLogin ? loginData.password : registerData.password}
                onChange={handleChange}
                required
                autoComplete={isLogin ? "current-password" : "new-password"} // 자동 완성 속성 추가
              />
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}

              <PasswordToggleIcon onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </PasswordToggleIcon>
            </InputWrapper>

            {/* 회원가입 필드 */}
            {!isLogin && (
              <>
                <InputWrapper>
                  <FontAwesomeIcon icon={faLock} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && (
                    <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                  )}
                </InputWrapper>

                <InputWrapper>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>

                <InputWrapper>
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="이름을 입력해주세요"
                    value={registerData.full_name}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <InputWrapper>
                  <FontAwesomeIcon icon={faPhone} />
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="전화번호를 입력해주세요"
                    value={registerData.phone_number}
                    onInput={onInputPhone}
                    maxLength={14}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone_number && (
                    <ErrorMessage>{errors.phone_number}</ErrorMessage>
                  )}

                  {/* 인증코드 보내기 버튼 */}
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    disabled={isCodeSent}
                  >
                    인증코드 받기
                  </button>
                </InputWrapper>
              </>
            )}

            {/* 인증코드 입력 필드 */}
            {!isLogin && isCodeSent && (
              <InputWrapper>
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="인증코드를 입력해주세요"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                {errors.verificationCode && (
                  <ErrorMessage>{errors.verificationCode}</ErrorMessage>
                )}

                {/* 인증코드 확인 버튼 */}
                <button
                  type="button"
                  onClick={verifyCode}
                  disabled={isVerified}
                >
                  인증코드 확인
                </button>
              </InputWrapper>
            )}

            {isLogin ? (
              <>
                <Link to="/reset-password">비밀번호 재설정</Link>
                <button type="submit">로그인</button>
                <button type="button" onClick={() => setIsLogin(false)}>
                  회원가입
                </button>
              </>
            ) : (
              <>
                <FormButton
                  type="submit"
                  disabled={!isVerified}
                  className={!isVerified ? "disabled" : ""}
                >
                  회원가입
                </FormButton>
                <button type="button" onClick={() => setIsLogin(true)}>
                  로그인으로 돌아가기
                </button>
              </>
            )}
          </form>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}

export default AuthModal;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: "GowunDodum-Regular", sans-serif;
  color: black;
  margin-top: 0.5rem;
  letter-spacing: 2px;
`;
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; /* 에러 메시지를 아래로 배치 */
  align-items: start;

  input {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 2.5rem;
    font-size: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: "GowunDodum-Regular", sans-serif;
  }

  svg {
    position: absolute;
    left: 10px;
    top: 15px;
    color: #333;
    font-size: 1rem;
  }
`;

const PasswordToggleIcon = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #333;
  font-size: 1rem;

  svg {
    position: absolute;
    left: -25px;
    top: 10px;
    color: #333;
    font-size: 1.5rem;
  }
`;

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
  max-width: 468px;
  width: 100%;

  padding: 2rem;
  border: 0px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  text-align: center;
  position: relative;
  z-index: 1001;
  background: linear-gradient(#f0f0c3, #f0f0c3);
  font-family: "GowunDodum-Regular";

  a {
    font-size: 24px;
    font-weight: 400;
    line-height: 160%;
    color: #667380;
    text-decoration-line: underline;
    font-family: "GowunDodum-Regular", sans-serif;
    letter-spacing: -0.087px;
    text-align: right;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 0.5rem 0.5rem;
      font-size: 1.5rem;
      border: none;
      border-radius: 5px;
      background: #e7e78b;
      font-family: "GowunDodum-Regular", sans-serif;
      color: black;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: white;
      }
    }
  }
`;

const FormButton = styled.button`
  padding: 0.5rem 0.5rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  background: #e7e78b;
  font-family: "GowunDodum-Regular", sans-serif;
  color: black;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: white;
  }

  // 비활성화 상태일 때의 스타일 추가
  &.disabled {
    background: #ccc; /* 회색 배경 */
    color: #666; /* 글자색 흐리게 */
    cursor: not-allowed; /* 커서 기본으로 변경 */
    pointer-events: none; /* 클릭 불가 */
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: #d8000c;
  background-color: #ffbaba;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  font-family: "GowunDodum-Regular", sans-serif;
  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #d8000c;
  }
`;
