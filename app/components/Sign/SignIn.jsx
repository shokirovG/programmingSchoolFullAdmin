"use client";
import useFetch from "@/app/hooks/useFetch";
import { signIn } from "@/app/redux/actions";
import { useDispatch } from "@/node_modules/react-redux/dist/react-redux";
import React, { useState } from "react";
import "./sign.scss";
const SignIn = ({ loginBtn }) => {
  const [login, setLogin] = useState();
  const [parol, setParol] = useState();
  const dispatch = useDispatch();
  const { request } = useFetch();
  const submitForm = (e) => {
    e.preventDefault();
    // request(
    //   `${process.env.NEXT_PUBLIC_URL}/auth`,
    //   "POST",
    //   JSON.stringify({ email: login, password: parol })
    // );

    // dispatch(signIn(login, parol));
  };
  return (
    <div className="loginBody">
      <div class="login">
        <h1>Login</h1>
        <form method="post" onSubmit={submitForm}>
          <input
            type="text"
            name="u"
            placeholder="Username"
            required="required"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            name="p"
            placeholder="Password"
            required="required"
            value={parol}
            onChange={(e) => setParol(e.target.value)}
          />
          <button
            type="submit"
            class="btn btn-primary btn-block btn-large btnLogin"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
