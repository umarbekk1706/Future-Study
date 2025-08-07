import React from 'react';
import styles from './footer.module.css';
import footerlogo from '../../assets/img/footerlogo.png';
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
            <img className={styles.minilogo} src={footerlogo} alt="logo" /> 
          <p className={styles.description}>
          Enhance your knowledge through a modern learning platform and create your future.
          </p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Tezkor havolalar</h3>
          <ul className={styles.linkList}>
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
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Contact</h3>
          <p className={styles.text}>Tashkent Uzbekistan</p>
          <p className={styles.text}>+998 90 123 45 67</p>
          <p className={styles.text}>info@futurestudy.uz</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Stay up to date with the news yoki Stay informed about the news</h3>
          <p className={styles.text}>
           Be the first to know about new courses and opportunities
          </p>
          <input
            type="email"
            placeholder="Email manzilingiz"
            className={styles.input}
          />
          <button className={styles.button}>Subscribe</button>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Future Study. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="#">Terms of Use yoki Terms and Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
