import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register() {
     const navigate=useNavigate();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  async function reg(e) {
    e.preventDefault();
    console.log(user);
    if (
      user.name &&
      user.lastname &&
      user.username &&
      user.email &&
      user.password
    ) {
      try {
        const res1 = await fetch(
          `https://6825bb6d0f0188d7e72e379f.mockapi.io/users`
        );
        const users = await res1.json();
        const newUser = users.find((u) => u.username === user.username);
        if (newUser) {
          alert("This username is already taken, please choose another one.");
        } else {
          const res = await fetch(
            "https://6825bb6d0f0188d7e72e379f.mockapi.io/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );
          if (res.status == 201) {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Fill in the information!");
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
        <div className={styles.loginImg}>
          <img src="https://account.asus.com/img/login_img02.png" alt="sdf" />
        </div>
        <form action="" className={styles.form}>
          <h2>Register</h2>
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value.trim() })}
            value={user.name}
            id="name"
            type="text"
            placeholder="Enter your name "
          />
          <label htmlFor="familya">Last name</label>
          <input
            onChange={(e) =>
              setUser({ ...user, lastname: e.target.value.trim() })
            }
            value={user.lastname}
            id="familya"
            type="text"
            placeholder="Enter your last name"
          />
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) =>
              setUser({ ...user, username: e.target.value.trim() })
            }
            value={user.username}
            id="username"
            type="text"
            placeholder="Enter your Username  "
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value.trim() })}
            value={user.email}
            id="email"
            type="email"
            placeholder="Enter your Email  "
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setUser({ ...user, password: e.target.value.trim() })
            }
            value={user.password}
            id="password"
            type="password"
            placeholder="Enter your Password  "
          />
          <button type="submit" id="submit-btn" onClick={reg}>
            Log up
          </button>
          <p>
            Have a account <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
