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
                    <h1>About us</h1>
                    <p>
                        <span className={styles.span}>"Future Study"</span> — This is a modern educational center that offers innovative and high-quality learning.
                        Our mission is to empower every student to learn independently and take confident steps toward their future.
                    </p>
                </section>

                <section className={styles.info}>
                    <div className={styles.infoText}>
                        <h2>Why choose us?</h2><br />
                        <ul className={styles.ul}>
                            <li>✔️ Qualified and experienced teachers</li>
                            <li>✔️ Practical and interactive lessons      </li>
                            <li>✔️ Education based on new technologies</li>
                            <li>✔️ Personalized approach and development</li>

                        </ul><br />
                    </div>
                    <div className={styles.infoImg}>
                        <img src="https://static.imtihonlar.uz/crop/1/0/832__85_1083151747.jpg?t=1719313759" alt="Students" />
                    </div>
                </section>

                <section className={styles.cta}>
                    <h2>Start your future with us!</h2>
                    <h2>Build your future with!<span className={styles.span}>"Future Study"</span></h2>
                </section>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Aboutus