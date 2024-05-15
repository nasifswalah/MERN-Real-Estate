import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json()
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      };
      console.log(data);
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleInput}
        />
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
          {loading ? "Loading..." : "Sign up"}
        </button>
        <div className="flex gap-2 mt-3">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
