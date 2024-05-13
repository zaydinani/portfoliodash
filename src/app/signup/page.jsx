"use client";
//my styles
import "../../styles/auth.scss";
import Link from "next/link";
import data from "../../data/data.json";
import { useRouter } from "next/navigation";
import react, { useState } from "react";

function signUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/admins", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <main>
      <div className="auth_container">
        <img src={data["zayd-data"].about.logo} alt="" />
        <form onSubmit={handleSubmit} method="post">
          <input
            className="input"
            name="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            className="input"
            name="password"
            type="password"
            id="password"
            placeholder="Enter your passoword"
            onChange={handleChange}
            value={formData.password}
            required
          />
          {/* 
          <input
            className="input"
            name="password"
            type="password"
            placeholder="confirm your passoword"
            required
          />
          */}
          <button type="submit">Sign up</button>
          <p className="writing">
            Or Sign In <Link href="/">here</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
export default signUp;
