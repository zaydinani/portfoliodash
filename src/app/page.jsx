"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

//my styles
import "../styles/auth.scss";
import data from "../data/data.json";

function Login() {
  const router = useRouter();

  const [name, setName] = useState(""); // State for username/email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  // Check authentication on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await getSession();
      if (session) {
        console.log("User is authenticated, redirecting to dashboard");
        router.push("/dashboard");
      }
    };
    checkAuthentication();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        name, // Replace with 'email' if using email-based sign-in
        password,
      });

      if (!result.error) {
        console.log("Sign in successful!");
        router.replace("/dashboard"); // Prevent accidental back button logout
      } else {
        setError("Username or password is wrong"); // Display error messages
        console.log(result.error);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className="auth_container">
        <img src={data["zayd-data"].about.logo} alt="logo" />
        {/* Replace with your logo path */}
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="user_name" // Replace with 'email' for email sign-in
            type="text"
            placeholder="Enter your username or email"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Sign In</button>
          {/* 
          <p className="writing">
            Or Sign Up <Link href="/signup">here</Link>
          </p>
          */}
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

export default Login;
