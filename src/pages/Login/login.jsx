import { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function check(e) {
    e.preventDefault();
    if (username.trim().length < 1 || password.trim().length < 1) {
      alert("Username va Parol kiriting!!");
      return;
    }
    try {
      const res = await fetch(
        `https://6825bb6d0f0188d7e72e379f.mockapi.io/users`
      );
      const users = await res.json();
      const user = users.find((u) => u.username === username);
      if (user && user.password === password) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        alert("Username yoki parol xato!!");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Ma'lumotlarni olishda xatolik yuz berdi.");
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <Link to="/">
          <button className={styles.backbtn}>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </Link>
        <form className={styles.form}>
          <h2>Login</h2>
          <p>Wellcome</p>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            type="text"
            placeholder="Username kiriting"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            type="password"
            placeholder="Parol kiriting"
          />
          <button type="submit" id="submit-btn" onClick={check}>
            Login
          </button>
          <p>
            No account yet? <a href="/register">Sign up</a>
          </p>
        </form>
        <div className={styles.loginImg}>
          <img src="https://account.asus.com/img/login_img02.png" alt="login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
