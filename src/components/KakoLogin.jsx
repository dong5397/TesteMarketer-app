import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoLogin = () => {
  const loginWithKakao = () => {
    Kakao.Auth.loginForm({
      success: function (authObj) {
        console.log(authObj);
      },
      fail: function (err) {
        console.log(err);
      },
    });
  };

  const displayToken = () => {
    const token = getCookie("authorize-access-token");

    if (token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function (res) {
          if (res.status === "connected") {
            document.getElementById("token-result").innerText =
              "login success, token: " + Kakao.Auth.getAccessToken();
          }
        })
        .catch(function (err) {
          Kakao.Auth.setAccessToken(null);
        });
    }
  };

  const getCookie = (name) => {
    const parts = document.cookie.split(name + "=");
    if (parts.length === 2) {
      return parts[1].split(";")[0];
    }
  };

  useEffect(() => {
    displayToken();
  }, []);

  return (
    <Wrapper>
      <KakaoLoginButton onClick={loginWithKakao}>
        <KakaoLoginImage
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </KakaoLoginButton>
      <TokenResult id="token-result"></TokenResult>
    </Wrapper>
  );
};

export default KakaoLogin;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const KakaoLoginButton = styled.button`
  margin-right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const KakaoLoginImage = styled.img``;

const TokenResult = styled.p``;
