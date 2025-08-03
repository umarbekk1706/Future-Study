import React from 'react'
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import styles from "./aboutus.module.css";

function Aboutus() {
    return (
        <div>
            <Header></Header>
            <div className={styles.main}>
                <section className={styles.hero}>
                    <h1>Biz haqimizda</h1>
                    <p>
                    <span className={styles.span}>"Future Study"</span> — bu innovatsion va sifatli ta'limni taqdim etuvchi zamonaviy o‘quv markazi. Bizning maqsadimiz har bir o‘quvchiga mustaqil o‘rganish va kelajakka ishonch bilan qadam qo‘yish imkoniyatini yaratishdir.
                    </p>
                </section>

                <section className={styles.info}>
                    <div className={styles.infoText}>
                        <h2>Nima uchun bizni tanlashadi?</h2><br />
                        <ul className={styles.ul}>
                            <li>✔️ Malakali va tajribali o‘qituvchilar</li>
                            <li>✔️ Amaliy va interaktiv darslar      </li>
                            <li>✔️ Yangi texnologiyalar asosida ta'lim</li>
                            <li>✔️ Shaxsiy yondashuv va rivojlanish</li>
                        </ul><br />
                    </div>
                    <div className={styles.infoImg}>
                        <img src="https://static.imtihonlar.uz/crop/1/0/832__85_1083151747.jpg?t=1719313759" alt="Talabalar" />
                    </div>
                </section>

                <section className={styles.cta}>
                    <h2>Kelajagingizni biz bilan boshlang!</h2>
                    <h2><span className={styles.span}>"Future Study"</span> bilan o'z kelajagingni qur !</h2>
                </section>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Aboutus