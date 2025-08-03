import React from 'react';
import styles from './footer.module.css';
import footerlogo from '../../assets/img/footerlogo.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
            <img className={styles.minilogo} src={footerlogo} alt="logo" /> 
          <p className={styles.description}>
            Zamonaviy taʼlim platformasi orqali bilimingizni oshiring va kelajakni yarating
          </p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Tezkor havolalar</h3>
          <ul className={styles.linkList}>
            <li><a href="#">Bosh sahifa</a></li>
            <li><a href="#">Kurslar</a></li>
            <li><a href="#">Testlar</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Biz haqimizda</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Bog‘lanish</h3>
          <p className={styles.text}>Toshkent sh, Amir Temur ko‘chasi, 108-uy</p>
          <p className={styles.text}>+998 90 123 45 67</p>
          <p className={styles.text}>info@futurestudy.uz</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Yangiliklardan xabardor bo‘ling</h3>
          <p className={styles.text}>
            Yangi kurslar va imkoniyatlar haqida birinchilardan bo‘lib xabardor bo‘ling
          </p>
          <input
            type="email"
            placeholder="Email manzilingiz"
            className={styles.input}
          />
          <button className={styles.button}>Obuna bo‘lish</button>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Future Study. Barcha huquqlar himoyalangan.</p>
        <div className={styles.bottomLinks}>
          <a href="#">Foydalanish shartlari</a>
          <a href="#">Maxfiylik siyosati</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
