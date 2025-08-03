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
          alert("Bunday username mavjud boshqa username tanlang");
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
      alert("Malumotlarni to'ldiring!");
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
          <h2>Ro'yxatdan o'tish</h2>
          <label htmlFor="name">Ism</label>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value.trim() })}
            value={user.name}
            id="name"
            type="text"
            placeholder="Ismingizni kiriting "
          />
          <label htmlFor="familya">Familya</label>
          <input
            onChange={(e) =>
              setUser({ ...user, lastname: e.target.value.trim() })
            }
            value={user.lastname}
            id="familya"
            type="text"
            placeholder="Familya kiriting "
          />
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) =>
              setUser({ ...user, username: e.target.value.trim() })
            }
            value={user.username}
            id="username"
            type="text"
            placeholder="Username kiriting "
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value.trim() })}
            value={user.email}
            id="email"
            type="email"
            placeholder="Email kiriting "
          />
          <label htmlFor="password">Parol</label>
          <input
            onChange={(e) =>
              setUser({ ...user, password: e.target.value.trim() })
            }
            value={user.password}
            id="password"
            type="password"
            placeholder="Parol kiriting "
          />
          <button type="submit" id="submit-btn" onClick={reg}>
            Ro'yxatdan o'tish
          </button>
          <p>
            Account mavjud? <a href="/login">Kirish</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
