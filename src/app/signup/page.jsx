"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../styles/auth.scss";
import data from "../../data/data.json";

function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null); // State for error messages
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

    // Password validation with regular expression
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*(),.?":{}|<>[\];'\\/])[A-Za-z\d@#$%^&*(),.?":{}|<>[\];'\\/]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and symbol."
      );
      return;
    }
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
      router.push("/dashboard");
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
            <p className="writing">
              Or Sign In <Link href="/">here</Link>
            </p>
          />
          */}
          <button type="submit">Sign up</button>
        </form>
        {/* Display errors */}
        {error && (
          <div class="alert alert-3-danger">
            <h3 class="alert-title">error</h3>
            <p class="alert-content">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default SignUp;
