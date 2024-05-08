//my styles
import "../styles/auth.scss";
import Link from "next/link";
import data from "../data/data.json";
import connectDB from "../config/db";

function Auth() {
  connectDB();
  return (
    <main>
      <div className="auth_container">
        <img src={data["zayd-data"].about.logo} alt="" />
        <form>
          <input
            className="input"
            name="user_name"
            type="text"
            placeholder="Enter your name"
            required
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter your passoword"
            required
          />
          <label>
            <input type="checkbox" />
            Stay signed in
          </label>
          <button type="submit">Sign In</button>
          <p className="writing">
            Or Sign Up <Link href="/signup">here</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
export default Auth;
