import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinStart, signinSuccess, signinFailure } from "../redux/user/userSlice.js";
import Oauth from "../components/Oauth.jsx";

export default function Signin() {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      };
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleInput}
        />
        <button 
          className="border p-3 rounded-lg bg-blue-700 hover:opacity-95 disabled:opacity-80 text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <Oauth/>
        <div className="flex gap-2 mt-3">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
