import styles from "./header.module.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogin = JSON.parse(localStorage.getItem("user")) ? true : false;

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Mobil menyu yopiladi
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
       
          <Link to="/" className={styles.headerLink}>
            <img src={logo} alt="logo" className={styles.logo} />
          </Link>


        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)} 
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/courses">Courses</Link>
            </li>
            <li>
             
              <Link to="/tests">Tests</Link>
            </li>
            <li>
              <Link to="/blogs">Blog</Link>
            </li>
            <li>
               <Link to="/about-us">About</Link>
            </li>
          </ul>

          {isLogin ? (
            <button onClick={logout} className={styles.signupBtn}>
              Log out
            </button>
          ) : (
            <div className={styles.btnBox}>
              <button onClick={login} className={styles.loginBtn}>
                Log in 
              </button>
              <button onClick={login} className={styles.signupBtn}>
                Log up
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
