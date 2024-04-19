import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Carousel } from "react-responsive-carousel";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import image4 from "../../images/4.jpg";
import image5 from "../../images/5.jpg";

function Main() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const login_sucessfully = () => toast("로그인 성공!");

  const login_fail = () => toast("로그인 실패!");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        login_sucessfully();
      } else {
        setAuth(false);
        login_fail();
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // Track scroll position
  const trackScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", trackScroll);

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  // 이미지 배열과 각 이미지의 회전 각도 배열
  const images = [image5, image2, image3, image4, image1];
  const rotationAngles = [20, 340, 20, 340, 20]; // 각 이미지의 회전 각도

  return (
    <Container>
      <LoginContainer>
        <div>
          <h2>로그인</h2>
          <form onSubmit={onSubmitForm}>
            <input
              type="email"
              name="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <button type="submit">로그인</button>

            <div />
            <Link to={"/register"}>회원가입 하기</Link>
          </form>
        </div>
      </LoginContainer>
      <ImgBox>
        {images.map((image, index) => (
          <ImageContainer key={index}>
            <RotatedImage
              src={image}
              alt={`Restaurant ${index + 1}`}
              rotationAngle={rotationAngles[index]}
            />
            <ImageOverlay>
              <Caption>레스토랑 {index + 1}</Caption>
            </ImageOverlay>
          </ImageContainer>
        ))}
      </ImgBox>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  height: 50%;
`;
const LoginContainer = styled.div`
  align-items: center;
  height: 50%;
`;

const ImgBox = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  overflow: hidden;
`;

const RotatedImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: rotate(${(props) => props.rotationAngle}deg);
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  transition: opacity 0.3s ease;
  opacity: 0;
  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const Caption = styled.div`
  color: black;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export default Main;
