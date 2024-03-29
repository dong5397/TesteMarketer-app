import React, { useState } from "react";
import { Link } from "react-router-dom";
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

      localStorage.setItem("token", parseRes.token);

      setAuth(true);
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
