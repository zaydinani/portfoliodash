"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../styles/auth.scss";
import Link from "next/link";
import data from "../../data/data.json";

function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", password: "" }); // Form data state
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
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\];'\\/])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\];'\\/]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, number, and symbol."
      );
      return;
    }

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const response = await res.json();
        setError(response.message);
      } else {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className="auth_container">
        <img src={data["zayd-data"].about.logo} alt="Logo" />
        <form onSubmit={handleSubmit} method="post">
          <input
            className="input"
            name="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={formData.name} // Ensure value is always controlled
            required
          />
          <input
            className="input"
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password} // Ensure value is always controlled
            required
          />
          <button type="submit">Sign up</button>
        </form>
        {/* Display errors */}
        {error && (
          <div className="alert alert-3-danger">
            <h3 className="alert-title">Error</h3>
            <p className="alert-content">{error}</p>
          </div>
        )}
        <p className="writing">
          Or Sign In <Link href="/">here</Link>
        </p>
      </div>
    </main>
  );
}

export default SignUp;
