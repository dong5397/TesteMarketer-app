import React, { useState } from "react";
import { Link } from "react-router-dom";
import {toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const register_sucessfully = () => toast("회원가입 성공!");

  const register_fail = () => toast("이미 존재하는 회원입니다.");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };

      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      // 회원가입 성공시 토큰 발급
      const parseRes = await response.json();

      if(parseRes.token) {
      localStorage.setItem("token", parseRes.token);

      setAuth(true);
      register_sucessfully()
    } else {
      setAuth(false);
      register_fail()
    }

     
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="name"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button>회원가입</button>
      </form>
      <Link to="/">로그인하기</Link>
    </>
  );
};
export default Register;
